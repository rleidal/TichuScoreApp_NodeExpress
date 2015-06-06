import express = require('express');
import routes = require('./routes/index');
import user = require('./routes/user');
import http = require('http');
import path = require('path');
//import socketIO = require('socket.io')(server);



var app = express();

// all environments
app.set('port', process.env.PORT || 9000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

import stylus = require('stylus');
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


var socketIO: SocketIO.Server = require('socket.io')(server);

import gameManager = require('./routes/gameManager');
var gm = new gameManager(socketIO);


socketIO.on('connection', function (socket: SocketIO.Socket) {
    console.log("Socket Connection Started\n");
    socket.on('addThem', function (data) {
        var total = parseInt(data.A) + parseInt(data.B);
        console.log("Attempting addition");
        socket.emit("result", { sum: total, A:data.A, B:data.B });
    });

    socket.on('enterGame', gm.enterGame.bind(gm, socket));
});

