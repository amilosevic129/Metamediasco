// Application HTTP Hosting server => server.js
'use strict';

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
// Import Cookie
var cookieParser = require('cookie-parser');
// Import libraries to set server.
var config = require('./_core/config');
var appRouter = require('./routes/routes');
var apiRouter = require('./routes/api');

// Set application send the request with HTTP.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 1;

// Initialize Application.
var app = express();
var httpServer = http.createServer(app);
app.use(cookieParser('some_secret_1234'));
// Templete engine set up.
// app.set('view engine', 'ejs');
app.engine('ejs', ejs.renderFile);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Public folder setting up.
app.use(express.static(path.join(__dirname, '/../public')));
app.use(expressLayouts);

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Bundle applicaion routes.
app.use('/', appRouter);

// Bundle API routes.
app.use('/api', apiRouter);

// Define server setting variables
var httpPort = process.env.PORT || config.server.port;

// Catch all route.
// app.get('*', (req, res) => {
//     res.render('index');
// });


// Starting server with HTTP.
httpServer.listen(httpPort, () => {
    console.log((new Date()) + '=> Http Sever running on http://' + httpServer.address().address + ':' + httpPort);
})
//Run app with HTTP, then load http://localhost:httpPort in a browser to see the output.