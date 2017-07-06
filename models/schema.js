// models/recipe.js
const mongoose = require('mongoose');

const pokeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    setID: String,
    cardNumber: Number,
    numberOwned: Number,
    moveList: [{
        moveName: { type: String, required: true, },
        energyCost: {
          energyType: {type: String, required: true},
          energyCount: {type: Number, required: true}
        },
        moveText: String,
        damage: Number
    }]
})

const pokeCard = mongoose.model('pokeCard', pokeSchema);

module.exports = pokeCard;
