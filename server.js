var express = require('express');
var path = require('path');
const http = require('http');
var bodyParser = require('body-parser');

const index = require('./routes/index');
const api = require('./routes/api');
const errors = require('./routes/errors');


var app = express();

var distDir = __dirname + '/dist/';
app.use(express.static(distDir));


app.use('/', index);
app.use('/api', api);
app.use('*', errors);

/**
 * Get port from environment and store in Express.
 */
//const port = process.env.PORT || 8080;
//app.set('port', port);

/**
 * Create HTTP server.
 */
//const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
//server.listen(port, () => console.log(`API running on localhost:${port}`));


/* Production version for Heroku deployment */

var server = app.listen(process.env.PORT || 3000, function(){
	var port = server.address().port;
	console.log('Location Service App now running on port', port);
});
