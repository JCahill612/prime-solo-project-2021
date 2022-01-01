const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
  rejectUnauthorized
} = require('../modules/authentication-middleware');
const multer  = require('multer')
const {storage,cloudinary} = require('../modules/cloudinary')
const upload = multer({storage})

/**
 * GET route template
 */

router.get('/', (req, res) => {

  const queryText = `SELECT toys.id, "name", description, toy_image_url, status, zip_code, toys_userid  from toys JOIN "user" ON toys.toys_userid = "user".id WHERE status = 'available'`

  pool.query(queryText)
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log('Get posts error ', err);
      res.sendStatus(500);
    }); 

});


router.get('/user', rejectUnauthenticated, (req, res) => {

  const queryText = `SELECT * FROM toys WHERE toys_userid = $1`

  pool.query(queryText,[req.user.id])
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log('Get posts error ', err);
      res.sendStatus(500);
    }); 

});




  router.get('/all', rejectUnauthenticated, rejectUnauthorized , (req, res) => {

    const queryText = `SELECT * FROM toys ORDER BY id DESC`
  
    pool.query(queryText)
      .then((response) => res.send(response.rows))
      .catch((err) => {
        console.log('Get posts error ', err);
        res.sendStatus(500);
      }); 
  
  });


  router.post('/', rejectUnauthenticated , upload.single('image'), (req, res) => {
    // POST route code here
  
    const {title, description} = req.body
  
    const queryText =  `INSERT INTO "toys" ("name", "description", "toy_image_url", "toy_image_name", "toys_userid")
    VALUES ($1, $2, $3, $4, $5)`

    pool.query(queryText,[title, description, req.file.path, req.file.filename, req.user.id])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Create toy posts error ', err);
      cloudinary.uploader.destroy(req.file.filename).then(()=>{
        res.sendStatus(500);
      })
    }); 
  
  });


  router.delete('/user/:id', rejectUnauthenticated, async (req, res) => {
    // DELETE route code here
    const {id} = req.params
    const queryText =  `DELETE FROM toys WHERE id = $1 AND toys_userid = $2 RETURNING toy_image_name`
    try {
        const response = await pool.query(queryText,[id,req.user.id])
        await cloudinary.uploader.destroy(response.rows[0].toy_image_name)
        res.sendStatus(200)
    } catch (error) {
      console.log('Deleting user toys error ', err);
      res.sendStatus(500);
    }
    
  });


  

router.put('/user/:id', rejectUnauthenticated , (req, res) => {

  const id = req.params.id
  const {title, description} = req.body
  
    const queryText = `UPDATE toys
    SET name = $1, description = $2
    WHERE id = $3 AND toys_userid = $4 AND status='available';`

    pool.query(queryText,[title, description, id ,req.user.id])
    .then(() => 
      res.sendStatus(201))
    .catch((err) => {
      console.log('user toy update error ', err);
      
        res.sendStatus(500);

    }); 

});



router.put('/image/:id', rejectUnauthenticated , upload.single('image'), async (req, res) => {
  // POST route code here
  const {id} = req.params

  const getImageNameQuery =  `SELECT toy_image_name FROM toys WHERE id = $1 AND toys_userid = $2 
  AND status='available';`

  const queryText =  `UPDATE toys
  SET toy_image_url = $1, toy_image_name = $2
  WHERE id = $3 AND toys_userid = $4 RETURNING toy_image_url;`


  try {
    const response =  await pool.query(getImageNameQuery,[id,req.user.id])
    const imageUrl = await pool.query(queryText,[req.file.path, req.file.filename, id, req.user.id])

    await cloudinary.uploader.destroy(response.rows[0].toy_image_name)

    res.send(imageUrl.rows[0].toy_image_url)

  } catch (error) {

    console.log('Creating posts error ', error);
      res.sendStatus(500);
  }

});



module.exports = router;

