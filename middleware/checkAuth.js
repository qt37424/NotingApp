exports.isAdmin = function (req, res, next) {
  if(req.body.username = "admin") {
    next();
  } else {
    return res.status(401).send('Access Denied');
  }
}

exports.requiresLogin = function (req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
}