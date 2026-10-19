const r = require('express').Router(),
  bcrypt = require('bcryptjs'),
  pool = require('../config/db'),
  asyncH = require('../middleware/async');
r.get('/login', (q, s) => s.render('login', { title: 'Log in' }));
r.post(
  '/login',
  asyncH(async (q, s) => {
    const email = String(q.body.email || '')
        .trim()
        .toLowerCase(),
      pass = String(q.body.password || '');
    if (!email || !pass) {
      q.flash('error', 'Email and password are required.');
      return s.redirect('/login');
    }
    const [u] = await pool.execute(
      'SELECT id,full_name,email,password_hash,role,student_number FROM users WHERE email=? AND is_active=1',
      [email],
    );
    if (!u.length || !(await bcrypt.compare(pass, u[0].password_hash))) {
      q.flash('error', 'Invalid email or password.');
      return s.redirect('/login');
    }
    q.session.regenerate((err) => {
      if (err) return s.status(500).send('Session error');
      q.session.user = {
        id: u[0].id,
        fullName: u[0].full_name,
        email: u[0].email,
        role: u[0].role,
        studentNumber: u[0].student_number,
      };
      q.session.save((e) =>
        e ? s.status(500).send('Session save error') : s.redirect('/dashboard'),
      );
    });
  }),
);
r.post('/logout', (q, s) =>
  q.session.destroy(() => {
    s.clearCookie('student_queue.sid');
    s.redirect('/login');
  }),
);
module.exports = r;
