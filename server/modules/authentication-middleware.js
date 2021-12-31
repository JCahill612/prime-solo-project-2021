const rejectUnauthenticated = (req, res, next) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // They were authenticated! User may do the next thing
    // Note! They may not be Authorized to do all things
    next();
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

const rejectUnauthorized = (req, res, next) => {
  // check if logged in
  if (req.user.user_role === 'admin') {
    // They were authorized! User may do the next thing
    next();
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};



module.exports = { rejectUnauthenticated, rejectUnauthorized };
