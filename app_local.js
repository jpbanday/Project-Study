var express = require('express');
var compression = require('compression');
var app = express();
require('dotenv').config();
var vhost = require('vhost');
var front = express(); //for front
var backend = express(); //for back
var https = require('https'); // use this if 443
var http = require('http');  // use this if not 443
var path = require('path');
var async = require('async');
var fs = require('fs');
var port = process.env.PORT || 8080;
var _ = require('lodash');
//var config = require('./config');
//var config2 = require('./config2')
// SERVICES
var appService = require('./controllers/services/appService')
var review = require('./controllers/services/workReviewService')
var workStatus = require('./controllers/services/workStatusService')
var user = require('./controllers/services/userService')

// app.use(vhost('localhost', front));
// app.use(vhost('backend.localhost', backend));

console.log(process.env)
app.use(express.static("./"));
app.use(express.json()) // for header - parsing application/json
app.use(express.urlencoded({ extended: true })) // for header - parsing application/x-www-form-urlencoded

//SSL
const options = {
    key: fs.readFileSync('./auth/private.key'),
    cert: fs.readFileSync('./auth/certificate.crt'),
    ca: fs.readFileSync('./auth/ca_bundle.crt'),
    minVersion: "TLSv1.2"
};

https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('hello SecureSign\n');
}).listen(8000);

var port = 443
//use http if not 443, https if 443
var server = https.createServer(options, app);
// END OF SSL



// API
app.get("/", function(req, res) {
    res.sendFile("./src/index.html", { root: __dirname });
});


//// BACKEND API's
// backend.use(compression());
// backend.use(express.urlencoded({ extended: true }));
// backend.use(express.json());
// backend.all("/api/*", function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Authorization, Content-Type, X-Requested-With, X-User-Password");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
//     res.header('Access-Control-Allow-Credentials', true);
//     return next();
// });


//SIGNUP
app.post("/api/signupUser", appService.signup);
// LOGIN
app.post("/api/loginUser", appService.login);
// ADMIN LOGIN
app.post("/api/adminLogin", appService.adminLogin);

//Review
app.post('/api/review/postReview', review.saveReviews);
app.get('/api/review/getReviewList', review.getReviewList);
app.get('/api/review/getAllListReview', review.getAllListReview);
app.post('/api/review/deleteReview', review.deleteReview);

//Work Status
app.post('/api/workstatus/saveWorkStatus', workStatus.saveWorkStatus);
app.get('/api/workstatus/getWorkStatus', workStatus.getWorkStatus);
app.post('/api/workstatus/deleteWorkStatus', workStatus.deleteWorkStatus);
app.post('/api/workstatus/updateWorkStatus', workStatus.updateWorkStatus);

// User 
app.get('/api/user/getUsers', user.getUsers);
app.post('/api/user/deleteUser', user.deleteUser);

front.get('/', function (req, res, next) {
    res.status(200).sendFile('index.html', { root: path.join(__dirname, 'src') });
});

// app.post("/api/savedata", async function(req, res) {
//     var data = await appService.getSample(req, res);
//     if(!(_.size(data))) {
//         res.status(500).json(appService.response(false, data.message, null, null));
//     } else {
//         res.status(200).json(appService.response(true, 'Success!', data));
//     }
// });

server.listen(port, function() {
    console.log('Server listening on port: '+ port);
})

http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80); //80

process.on('uncaughtException', function (err) {
    console.log('uncaughtException : ' + err);
});