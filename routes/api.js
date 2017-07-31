var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
var mongodbUri = 'mongodb://uji:geoc@ds141950.mlab.com:41950/mytasklist_thewebdeveloper';
mongoose.connect(mongodbUri);

Context = require('../models/context');

router.get('/test', function(req, res, nex) {
    res.send('This is an API end point test');
});

router.get('/contexts', function(req, res) {
    Context.getContexts(function(err, contexts) {
        if (err) {
            console.log(err);
            return;
        }
        res.json(contexts);
    });
});

router.get('/context/:_id', function(req, res) {
    var id = req.params._id;
    Context.getContextById(id, function(err, context) {
        if (err) {
            res.send(err);
        }
        if (context) {
            res.json(context);
        } else {
            res.json('No context found with ID of ' + id);
        }
    });
});
router.get('/test/:name&:surname', function(req, res) {
    var name = req.params.name;
    var surname = req.params.surname;
    var str = name + " " + surname;
    res.json({
        'name': name
    });
});

//router.get('/contexts/near/:lng/:lat/:distance', function(req, res) {
router.get('/contexts/near/:lng/:lat/:distance', function(req, res) {
    var lng = req.params.lng;
    var lat = req.params.lat;
    var distance = req.params.distance;
    //var lng = -0.036141;
    //var lat = 39.981656;

    /*
    var location = {
        type: "Point",
        coordinates: [-0.036141, 39.981656]
    };
    var searchOptions = {
        maxDistance: 300,
        spherical: true,
        distanceMultiplier: 1
    };
    */

    /*
    var distance = 202;
    var query = {
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                },
                $maxDistance: distance,
                spherical: true
            }
        }
    };

    Context.find(query, function(err, contexts) {
        if (err) {
            res.send(err);
        }
        if (contexts) {
            res.json(contexts);
        } else {
            res.send('No context found within the distance');
        }
    });
*/
    Context.getContextsNear(lng, lat, distance, function(err, contexts) {
        if (err) {
            res.send(err);
        }
        if (contexts) {
            res.json(contexts);
        } else {
            res.json('No contexts found within the distance of ' + distance);
        }
    });
});

module.exports = router;
