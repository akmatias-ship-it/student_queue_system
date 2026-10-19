const r = require('express').Router(),
  pool = require('../config/db'),
  { requireRole } = require('../middleware/auth'),
  ah = require('../middleware/async');
r.get(
  '/services',
  requireRole('admin'),
  ah(async (q, s) => {
    const [services] = await pool.execute('SELECT * FROM services ORDER BY name');
    s.render('services', { title: 'Manage Services', services });
  }),
);
r.post(
  '/services',
  requireRole('admin'),
  ah(async (q, s) => {
    const name = String(q.body.name || '').trim(),
      description = String(q.body.description || '').trim();
    if (name.length < 2 || name.length > 100) {
      q.flash('error', 'Name must be 2–100 characters.');
      return s.redirect('/admin/services');
    }
    try {
      await pool.execute('INSERT INTO services(name,description) VALUES(?,?)', [
        name,
        description || null,
      ]);
      q.flash('success', 'Service added.');
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') q.flash('error', 'Service already exists.');
      else throw e;
    }
    s.redirect('/admin/services');
  }),
);
r.post(
  '/services/:id/toggle',
  requireRole('admin'),
  ah(async (q, s) => {
    await pool.execute('UPDATE services SET is_active=IF(is_active=1,0,1) WHERE id=?', [
      Number(q.params.id),
    ]);
    q.flash('success', 'Service availability updated.');
    s.redirect('/admin/services');
  }),
);
module.exports = r;
