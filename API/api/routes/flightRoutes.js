'use strict';
module.exports = function(app) {
  var flights = require('../controllers/flightControl');

  // todoList Routes
  app.route('/money')
    .get(flights.list_all_tasks)

  app.route('/name/:airlineId')
    .get(flights.read_a_task)
    .put(flightsupdate_a_task)
    .delete(flights.delete_a_task);
};