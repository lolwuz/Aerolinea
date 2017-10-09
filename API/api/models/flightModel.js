'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Airline = new Schema({
    name: {
      type: String,
      required: 'Please give the name of the airline.'
    },
    Created_date: {
      type: Date,
      default: Date.now
    },
    money: {
        type: Number,
        default: 1000
    }
  });
  
  module.exports = mongoose.model('Airlines', Airline);