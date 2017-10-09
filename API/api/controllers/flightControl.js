'use strict';


var mongoose = require('mongoose'),
  Flight = mongoose.model('Flights');

exports.list_all_Flights = function(req, res) {
  Flight.find({}, function(err, Flight) {
    if (err)
      res.send(err);
    res.json(Flight);
  });
};

exports.create_a_Flight = function(req, res) {
  var new_Flight = new Flight(req.body);
  new_Flight.save(function(err, Flight) {
    if (err)
      res.send(err);
    res.json(Flight);
  });
};


exports.read_a_Flight = function(req, res) {
  Flight.findById(req.params.FlightId, function(err, Flight) {
    if (err)
      res.send(err);
    res.json(Flight);
  });
};


exports.update_a_Flight = function(req, res) {
  Flight.findOneAndUpdate({_id: req.params.FlightId}, req.body, {new: true}, function(err, Flight) {
    if (err)
      res.send(err);
    res.json(Flight);
  });
};


exports.delete_a_Flight = function(req, res) {mo
  Flight.remove({
    _id: req.params.FlightId
  }, function(err, Flight) {
    if (err)
      res.send(err);
    res.json({ message: 'Flight successfully deleted' });
  });
};
