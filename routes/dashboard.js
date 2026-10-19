const r = require('express').Router(),
  pool = require('../config/db'),
  { requireAuth } = require('../middleware/auth'),
  ah = require('../middleware/async');
r.get(
  '/',
  requireAuth,
  ah(async (q, s) => {
    const [services] = await pool.execute('SELECT * FROM services WHERE is_active=1 ORDER BY name');
    let tickets = [],
      stats = { waiting: 0, called: 0, serving: 0, completed: 0 };
    if (q.session.user.role === 'student') {
      [tickets] = await pool.execute(
        'SELECT q.*,s.name service_name FROM queue_tickets q JOIN services s ON s.id=q.service_id WHERE q.student_id=? ORDER BY q.created_at DESC LIMIT 10',
        [q.session.user.id],
      );
    } else {
      const [rows] = await pool.execute(
        'SELECT status,COUNT(*) total FROM queue_tickets WHERE DATE(created_at)=CURDATE() GROUP BY status',
      );
      rows.forEach((x) => {
        if (stats[x.status] !== undefined) stats[x.status] = x.total;
      });
    }
    s.render('dashboard', { title: 'Dashboard', services, tickets, stats });
  }),
);
module.exports = r;
