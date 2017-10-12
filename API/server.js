// server.js

// BASE SETUP

var mongoose   = require('mongoose');
mongoose.connect('mongodb://default:Excalibur20@ds117935.mlab.com:17935/aerolinea'); // connect to our database

var Airliner = require('./app/models/airliner');

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
var router = express.Router();              // get an instance of the express Router


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here
router.route('/airliner')
// create a bear (accessed at POST http://localhost:8080/bears)
    .post(function(req, res) {

        var airliner = new Airliner();
        airliner.name = req.body.name;

        airliner.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Airliner created!' });
        });


    })

    .get(function(req, res) {
        Airliner.find(function(err, airliner) {
            if (err)
                res.send(err);

            res.json(airliner);
        });
    });



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);
