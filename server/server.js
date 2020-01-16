// requires
const express = require('express');
const bodyParser = require('body-parser');
const taskRouter = require('./routes/tasks.router');
const app = express();


// uses
app.use(bodyParser.urlencoded({extended: true}));
app.use('/tasks', taskRouter);
app.use(express.static('server/public'))

// globals
const PORT = process.env.PORT || 5000;

// server up on
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});





