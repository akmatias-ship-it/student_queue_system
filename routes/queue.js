const r = require('express').Router(),
  pool = require('../config/db'),
  { requireRole } = require('../middleware/auth'),
  ah = require('../middleware/async'),
  { makeTicketNumber } = require('../utils/queue');
r.get(
  '/mine',
  requireRole('student'),
  ah(async (q, s) => {
    const [tickets] = await pool.execute(
      'SELECT q.*,s.name service_name FROM queue_tickets q JOIN services s ON s.id=q.service_id WHERE q.student_id=? ORDER BY q.created_at DESC LIMIT 50',
      [q.session.user.id],
    );
    s.render('mine', { title: 'My Tickets', tickets });
  }),
);
r.post(
  '/join',
  requireRole('student'),
  ah(async (q, s) => {
    const sid = Number(q.body.service_id);
    if (!Number.isInteger(sid) || sid < 1) {
      q.flash('error', 'Choose a valid service.');
      return s.redirect('/dashboard');
    }
    const [sv] = await pool.execute('SELECT id FROM services WHERE id=? AND is_active=1', [sid]);
    if (!sv.length) {
      q.flash('error', 'Service is not available.');
      return s.redirect('/dashboard');
    }
    const [ex] = await pool.execute(
      "SELECT id FROM queue_tickets WHERE student_id=? AND service_id=? AND DATE(created_at)=CURDATE() AND status IN ('waiting','called','serving') LIMIT 1",
      [q.session.user.id, sid],
    );
    if (ex.length) {
      q.flash('error', 'You already have an active ticket for this service today.');
      return s.redirect('/queue/mine');
    }
    const [cnt] = await pool.execute(
      'SELECT COUNT(*) total FROM queue_tickets WHERE service_id=? AND DATE(created_at)=CURDATE()',
      [sid],
    );
    const no = makeTicketNumber(Number(cnt[0].total) + 1);
    await pool.execute(
      'INSERT INTO queue_tickets(ticket_number,student_id,service_id,status) VALUES(?,?,?,?)',
      [no, q.session.user.id, sid, 'waiting'],
    );
    q.flash('success', `Ticket ${no} created.`);
    s.redirect('/queue/mine');
  }),
);
r.get(
  '/staff',
  requireRole('admin', 'staff'),
  ah(async (q, s) => {
    const [services] = await pool.execute('SELECT * FROM services WHERE is_active=1 ORDER BY name');
    const sid = Number(q.query.service_id || (services[0] && services[0].id) || 0);
    let tickets = [];
    if (sid)
      [tickets] = await pool.execute(
        "SELECT q.*,u.full_name,u.student_number,s.name service_name FROM queue_tickets q JOIN users u ON u.id=q.student_id JOIN services s ON s.id=q.service_id WHERE q.service_id=? AND DATE(q.created_at)=CURDATE() ORDER BY FIELD(q.status,'serving','called','waiting','completed','cancelled','no_show'),q.created_at",
        [sid],
      );
    s.render('staff', { title: 'Queue Desk', services, serviceId: sid, tickets });
  }),
);
r.post(
  '/call-next',
  requireRole('admin', 'staff'),
  ah(async (q, s) => {
    const sid = Number(q.body.service_id);
    const [next] = await pool.execute(
      "SELECT id FROM queue_tickets WHERE service_id=? AND DATE(created_at)=CURDATE() AND status='waiting' ORDER BY created_at ASC LIMIT 1",
      [sid],
    );
    if (!next.length) {
      q.flash('error', 'No waiting students.');
      return s.redirect('/queue/staff?service_id=' + sid);
    }
    await pool.execute(
      "UPDATE queue_tickets SET status='called',called_at=NOW(),called_by=? WHERE id=?",
      [q.session.user.id, next[0].id],
    );
    q.flash('success', 'Next ticket called.');
    s.redirect('/queue/staff?service_id=' + sid);
  }),
);
r.post(
  '/:id/status',
  requireRole('admin', 'staff'),
  ah(async (q, s) => {
    const id = Number(q.params.id),
      status = q.body.status;
    if (
      !Number.isInteger(id) ||
      !['serving', 'completed', 'no_show', 'cancelled'].includes(status)
    ) {
      q.flash('error', 'Invalid ticket status.');
      return s.redirect('/queue/staff');
    }
    await pool.execute(
      "UPDATE queue_tickets SET status=? WHERE id=? AND status IN ('waiting','called','serving')",
      [status, id],
    );
    q.flash('success', 'Ticket status updated.');
    s.redirect('/queue/staff');
  }),
);
r.post(
  '/:id/cancel',
  requireRole('student'),
  ah(async (q, s) => {
    const [out] = await pool.execute(
      "UPDATE queue_tickets SET status='cancelled' WHERE id=? AND student_id=? AND status='waiting'",
      [Number(q.params.id), q.session.user.id],
    );
    q.flash(
      out.affectedRows ? 'success' : 'error',
      out.affectedRows ? 'Ticket cancelled.' : 'Only your waiting tickets can be cancelled.',
    );
    s.redirect('/queue/mine');
  }),
);
module.exports = r;
