var express = require('express');
var todoController = require('./controller/todoController');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//set up static files
app.use(express.static('public'));
//fire controller
todoController(app);

//listen to port
app.listen(3000);
console.log('We are listening to port no 3000');
