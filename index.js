'use strict';

var app = require('express')();
app.get('/', function(req, res) {
	res.send('Hello World');
});

app.set('port', (process.env.PORT || 5000));
var server = app.listen(app.get('port'), function () {

	var host = server.address().address;
	var port = server.address().port;
	console.log('Listing on http://%s:%s', host, port);
});


