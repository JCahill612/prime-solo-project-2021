const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

router.post('/register', (req, res, next) => {  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const email = req.body.email;

  const queryText = 'INSERT INTO "user" (username, password, user_email) VALUES ($1, $2, $3) RETURNING id';
  pool.query(queryText, [username, password, email])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});


router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});


router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
