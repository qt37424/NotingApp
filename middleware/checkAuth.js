exports.isLoggedIn = function (req, res, next) {
  if(!req.username) {
    next();
  } else {
    return res.status(401).send('Access Denied');
  }
}

exports.isAdmin = function (req, res, next) {
  if(req.body.username = "admin") {
    next();
  } else {
    return res.status(401).send('Access Denied');
  }
}

exports.requiresLogin = function (req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
}

exports.UserLogin = function(req, res) {
  return req.user;
}
