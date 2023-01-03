"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _fs = require("fs");
var _exceptionHandler = _interopRequireDefault(require("./utils/exceptions/exceptionHandler"));
var _os = require("os");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//console.log(express);
var app = (0, _express["default"])();

// require your built in module

// invoking middleware

app.use((0, _morgan["default"])('common'));
app.use(_express["default"]["static"]('public'));
app.get('/', function (req, res) {
  res.send('<h1>Welcome to to the Movie-Api </h1> <a href="/documentation.html"> Documentation </a>');
});
app.get('/movies', function (req, res) {
  (0, _fs.readFile)('db.json', 'utf8', function (err, data) {
    if (err) {
      console.error(err);
      return;
    }
    var movies = JSON.parse(data);
    console.log(movies.movies[0]);
    res.status(200).json({
      success: true,
      data: movies
    });
  });
});
app.all('*', function (req, res, next) {
  next(new _exceptionHandler["default"](404, "The url ".concat(req.originalUrl, " could't be not found on this server")));
});
app.use(function (err, req, res, next) {
  var status = err.statusCode || 500;
  var message = err.message || 'Oh No, Something Went Wrong!';
  res.status(status).json({
    success: false,
    status: status,
    message: message
  });
  next();
});
var _default = app;
exports["default"] = _default;