var bodyparser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://test:zidane4u@ds125892.mlab.com:25892/todo');

//Create a schema which is like a blueprint
var todoSchema = new mongoose.Schema({
  item : String
});

var Todo = mongoose.model('Todo' , todoSchema);

var urlencodedparser = bodyparser.urlencoded({extended : false }) ;

//fake data
//var data = [{item:'Buy 1 litre olpers'},{item : 'Buy 5 kg rice'},{item : 'Buy some brownies'}];

module.exports = function (app){
app.get('/todo', function(req,res){

Todo.find({}, function (err , data) {
  if(err) throw err;
  res.render('todo-view',{todos : data});

});
});

app.post('/todo', urlencodedparser ,function(req,res){
var newTodo = Todo(req.body).save(function (err , data){
  if (err) throw err;
  res.json(data);

})


});

app.delete('/todo/:item', function(req,res){

Todo.find({item : req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
  if (err) throw err;
  res.json(data);
  });

});

};
