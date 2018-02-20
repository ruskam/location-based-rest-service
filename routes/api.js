var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
//var mongodbUri = 'mongodb://uji:geoc@ds141950.mlab.com:41950/mytasklist_thewebdeveloper';
var mongodbUri = 'mongodb://cubdm:iiajwnc@ds141950.mlab.com:41950/mytasklist_thewebdeveloper';


/* Line of code below has to be uncommented to allow database connection */
mongoose.connect(mongodbUri);


Context = require('../models/context');

router.get('/', function(req, res, next) {
    res.send('This is an API end point test');
});

/* This route is for testing without calling data from mLab database BEGING */

router.get('/testing', function(req, res, next){

    var dummieContextResponse = [{
        "_id": {
            "$oid": "597b4cbd734d1d3e10b6a380"
        },
        "location": {
            "type": "Point",
            "coordinates": [
                55.5,
                42.3
            ]
        },
        "context_id": 1,
        "context": "traffic lights context",
        "roles":[{
                  "role_id": "role_01",
                  "role_name": "Senior Pedestrian",
                },
                {
                    "role_id": "role_02",
                    "role_name": "Visually Impaired",
                }]
    },{
        "_id": {
            "$oid": "597b4cbd734d1d3e1sdfsdf380"
        },
        "location": {
            "type": "Point",
            "coordinates": [
                34.5,
                16.3
            ]
        },
        "context_id": 2,
        "context": "restaurant context",
        "roles":[{
                  "role_id": "role_03",
                  "role_name": "role 3",
                },
                {
                    "role_id": "role_3",
                    "role_name": "role 4",
                }]
    }];

    res.contentType('application/json');
    var result = {"results": dummieContextResponse};
    res.json(result);
});
/* This route is for testing without calling data from mLab database END */

/* This route is for testing without calling data from mLab database BEGING */

router.get('/testing/device', function(req, res, next){

    var deviceTestingResponse = {
        "test_description": "device test",
        "test_status": {
            "software_level": "passed",
            "hardware_level": "passed"
        }
    };

    res.contentType('application/json');
    //var result = {"results": deviceTestingResponse};
    res.json(deviceTestingResponse);
});
/* This route is for testing without calling data from mLab database END */


router.get('/contexts', function(req, res) {
    Context.getContexts(function(err, contexts) {
        if (err) {
            console.log(err);
            return;
        }
        res.json(contexts);
    });
});

router.get('/contexts/:_id', function(req, res) {
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
        'name': name,
        'surname': surname
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
