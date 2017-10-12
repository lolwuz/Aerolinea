// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AirlinerSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Airliner', AirlinerSchema);
