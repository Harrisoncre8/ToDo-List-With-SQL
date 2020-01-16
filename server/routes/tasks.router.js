const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// GET route
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todo" ORDER BY "id";';
    pool.query(queryText).then(result => {
      // Sends back the results in an object
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting tasks on server side', error);
      res.sendStatus(500);
    });
}); // end get

// POST route
// Adds a new task to DB and responds
router.post('/',  (req, res) => {
    let newTask = req.body;
    console.log(`Adding task`, newTask);
    let queryText = `INSERT INTO "todo" ("task") VALUES ($1);`;
    pool.query(queryText, [newTask.task])
      .then(result => {
        res.sendStatus(201);
      }).catch(error => {
        console.log(`Error adding new task`, error);
        res.sendStatus(500);
      });
  }); // end post

// DELETE route
router.delete('/:id',  (req, res) => {
    let id = req.params.id; 
    console.log('DELETE route called with id of', id);
    let queryString = `DELETE FROM "todo" WHERE "id"=$1`;
    pool.query(queryString, [req.params.id]).then(result =>{
      res.sendStatus(200);
    }).catch(error => {
      console.log(`Error deleting new task`, error);
      res.sendStatus(500);
    });
}); // end delete

// PUT route to change status of task
router.put('/:id',  (req, res) => {
    let todo = req.body; // todo task with updated content
    let id = req.params.id; // id of the todo task to update
    let complete = req.body.progress;
    console.log(`Updating task ${id} with`, todo);
    let queryText = ``;
    if (complete === 'in-progress'){
        queryText =`UPDATE "todo" SET "status" = 'Completed' WHERE "id"=$1`;
    } else if (complete === 'complete') {
        queryText =`UPDATE "todo" SET "status" = 'In Progress' WHERE "id"=$1`;
    } else {
    res.sendStatus(500);
    }
    pool.query( queryText, [req.params.id] ).then( response => {
        res.sendStatus(200);
    })
})// end PUT router 

module.exports = router;