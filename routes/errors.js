var express = require('express');
var router = express.Router();

router.get('*', function(req, res, next){
    res.send('Oops, it seems there is no API at the requested URL');
});

module.exports = router;
