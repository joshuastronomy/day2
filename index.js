const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const pokeCard = require('./models/schema');
const mainRouter = require('./routes/routes');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/views', express.static('views'));

app.use('/', mainRouter);

// app.get('/:name', function (req, res) {
// pokeCard.create({name: req.params.name})
// .then(console.log("New Pokemon Added!"))
// .catch(console.log("handleError"));
//
// })

// app.listen(3000, function(req, res) {
//   mongoose.connect('mongodb://localhost:27017/pokeCards');
//
//   console.log("Pokecard online...")
// })

mongoose.connect('mongodb://localhost:27017/pokeCards', (err) => {
  if (err) return console.log(err)
  app.listen(process.env.PORT || 3000, () => {
    console.log('PokeCards online...')
  })
})
