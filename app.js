
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();
var server = app.listen(3000);

var io = require('socket.io').listen(server); // this tells socket.io to use our express server


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// SOKETS

var stream = io.of('/stream')
	.on('connection',
		function (socket) {
			var vidStream = parrotClient.getPngStream();
            vidStream.on('data', function(data){
			    socket.emit('getstream', data);	
            });

		}
	);


// DRONE CONTROL
var arDrone   = require('ar-drone');
parrotClient  = arDrone.createClient();

app.get('/', routes.index);
app.get('/stream', routes.stream)
app.get('/users', user.list);

//http.createServer(app).listen(app.get('port'), function(){
//  console.log('Express server listening on port ' + app.get('port'));
//});
