const express = require('express');
const exphbs  = require('express-handlebars');
const bodyparser = require('body-parser');

const app = express();

//view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//body parser
app.use(bodyparser.urlencoded({extended: false}));

const todos = [
  {todo: 'Play too many video games'},
  {todo: 'Eat Dinner'},
];

const finished = [
];

//passes todos and finished arrays into main page to be used in HTML
app.get('/', (req, res) => {
  res.render('home', {todos: todos, finished: finished});
});

//adds content of input to array
app.post('/add', (req, res) => {
  todos.push({todo: req.body.item});
  console.log(req.body.item);
  console.log(todos);
  res.redirect('/');
});

//runs when clicking complete button
app.post('/complete', (req, res) => {
  console.log(req.body.removeButton);
  //iterates over todos
  todos.forEach((item, index) => {
    //if item in todos = text next to button (value of button)
    if (req.body.removeButton == todos[index].todo) {
      var newList = todos[index];
      todos.splice(index, 1);
      finished.push(newList);
      console.log(finished);
    }
  });
  res.redirect('/');
});

//crank it up
app.listen(3000);
