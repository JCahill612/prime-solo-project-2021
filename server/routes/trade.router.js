const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
  rejectUnauthorized
} = require('../modules/authentication-middleware');


router.get('/offer', rejectUnauthenticated , (req, res) => {

  const queryText = `SELECT trade.id, array_AGG("name") as toyNames, array_AGG(toy_image_url) as imageUrl, trade.status, offering_userid, requested_userid, offered_toyid, requested_toyid FROM toys 
  JOIN trade ON toys.id = trade.offered_toyid OR toys.id = trade.requested_toyid WHERE offering_userid = $1 GROUP BY trade.id;`

  pool.query(queryText,[req.user.id])
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log('Get posts error ', err);
      res.sendStatus(500);
    }); 

});


router.get('/request', rejectUnauthenticated , (req, res) => {

  const queryText = `SELECT trade.id, array_AGG("name") as toyNames, array_AGG(toy_image_url) as imageUrl, trade.status, message, offering_userid, requested_userid, offered_toyid, requested_toyid FROM toys 
  JOIN trade ON toys.id = trade.offered_toyid OR toys.id = trade.requested_toyid WHERE requested_userid = $1 GROUP BY trade.id;`

  pool.query(queryText,[req.user.id])
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log('Get posts error ', err);
      res.sendStatus(500);
    }); 

});




router.get('/requestcontact/:id', rejectUnauthenticated , (req, res) => {

  const {id} = req.params

  const queryText = `SELECT username, user_email, phone_no, user_address FROM trade JOIN "user" ON 
  trade.offering_userid = "user".id
  WHERE status = 'accepted' AND trade.requested_userid = $1 AND trade.id = $2; `

  pool.query(queryText,[req.user.id,id])
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log('Get posts error ', err);
      res.sendStatus(500);
    }); 

});



router.get('/offercontact/:id', rejectUnauthenticated , (req, res) => {

  const {id} = req.params

  const queryText = `SELECT username, user_email, phone_no, user_address FROM trade JOIN "user" ON 
  trade.requested_userid = "user".id
  WHERE status = 'accepted' AND trade.offering_userid = $1 AND trade.id = $2; `

  pool.query(queryText,[req.user.id,id])
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log('Get posts error ', err);
      res.sendStatus(500);
    }); 

});




router.post('/', rejectUnauthenticated , async (req, res) => {
    // POST route code here
  
    const {requestedUser , offeredToy, requestedToy, message} = req.body
  
    const queryText =  `INSERT INTO "trade" ("offering_userid", "requested_userid", "offered_toyid", "requested_toyid", "message")
    VALUES ($1, $2, $3, $4, $5)`

    const updateQueryText = `UPDATE toys
    SET status = 'In trade process'
    WHERE id = $1 OR id = $2 AND status='available';`

    try {
        
      await  pool.query(queryText,[ req.user.id, requestedUser , offeredToy, requestedToy, message ])

      await  pool.query(updateQueryText,[ offeredToy, requestedToy ])

      res.sendStatus(201)
    } catch (error) {
      console.log('Create trade posts error ', error);
      res.sendStatus(500);
    }
  
  });

  
router.put('/reject/:id', rejectUnauthenticated , async (req, res) => {
  // POST route code here

  const {id} = req.params

  
  const queryText = `UPDATE trade
  SET status = 'rejected'
  WHERE id = $1 AND requested_userid= $2 RETURNING requested_toyid, offered_toyid;`

  const updateQueryText = `UPDATE toys
  SET status = 'available'
  WHERE id = $1 OR id = $2 AND status='In trade process';`


  try {
      
    const response = await  pool.query(queryText,[ id , req.user.id ])

    await  pool.query(updateQueryText,[ response.rows[0].requested_toyid, response.rows[0].offered_toyid ])

    res.sendStatus(201)
  } catch (error) {
    console.log('reject trade error ', error);
    res.sendStatus(500);
  }

});



router.put('/accept/:id', rejectUnauthenticated , async (req, res) => {
  // POST route code here
  const {id} = req.params

  
  const queryText = `UPDATE trade
  SET status = 'accepted'
  WHERE id = $1 AND requested_userid= $2 RETURNING requested_toyid, offered_toyid;`

  const updateQueryText = `UPDATE toys
  SET status = 'traded'
  WHERE id = $1 OR id = $2 AND status='In trade process';`

  try {
      
    const response = await  pool.query(queryText,[ id , req.user.id ])

    await  pool.query(updateQueryText,[ response.rows[0].requested_toyid, response.rows[0].offered_toyid ])

    res.sendStatus(201)
  } catch (error) {
    console.log('accept trade error ', error);
    res.sendStatus(500);
  }

});



  router.delete('/offer/:id', rejectUnauthenticated , async (req, res) => {
    const {id} = req.params
    const queryText = `DELETE FROM trade WHERE id = $1 AND trade.offering_userid = $2 RETURNING requested_toyid, offered_toyid;`

    const updateQueryText = `UPDATE toys
    SET status = 'available'
    WHERE id = $1 OR id = $2 AND status='In trade process';`

    try {
      
      const response = await  pool.query(queryText,[ id , req.user.id ])
  
      await  pool.query(updateQueryText,[ response.rows[0].requested_toyid, response.rows[0].offered_toyid ])
  
      res.sendStatus(200)
    } catch (error) {
      console.log('delete trade error ', error);
      res.sendStatus(500);
    }
    
  });
  


module.exports = router;