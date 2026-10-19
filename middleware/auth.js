function requireAuth(req, res, next) {
  if (!req.session.user) {
    req.flash('error', 'Please log in.');
    return res.redirect('/login');
  }
  next();
}
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.session.user) {
      req.flash('error', 'Please log in.');
      return res.redirect('/login');
    }
    if (!roles.includes(req.session.user.role))
      return res.status(403).render('error', {
        title: 'Access denied',
        status: 403,
        message: 'You do not have permission to access this page.',
      });
    next();
  };
}
module.exports = { requireAuth, requireRole };
