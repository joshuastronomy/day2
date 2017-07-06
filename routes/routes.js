const express = require('express');
const pokeCard = require('../models/schema');
const router = express.Router();

router.get('/', (req, res) => {
  pokeCard.find().then(function(searchResults)  {

  res.render('app', {pokemonCard: searchResults});
})});

router.post('/createCard', (req, res) => {
  pokeCard.create({
    name: req.body.newName,
    setID: req.body.newSetID,
    cardNumber: req.body.newNumber,
    numberOwned: req.body.newOwned
  }).then(function(partialCard) {
    partialCard.moveList = [{
      moveName: req.body.newMove,
      energyCost: {
        energyType: req.body.newMoveType,
        energyCount: req.body.newMoveNum
      },
      moveText: req.body.newMoveText,
      damage: req.body.newDamage
    }];
    partialCard.save().then(function() {      res.redirect('/');
    })
  })
})

router.post('/delete/:name', (req, res) =>  {
  pokeCard.find({name: req.params.name}).remove().exec();
  res.redirect('/');
})

router.post('/ownedUpdate/:name', (req, res) =>  {
  console.log(req.body.updateText);
  pokeCard.find({name:
  req.params.name}).update({numberOwned: req.body.updateText}).exec();
  res.redirect('/');
})

module.exports = router;
