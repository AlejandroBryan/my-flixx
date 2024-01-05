"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _path = _interopRequireDefault(require("path"));
var _ejs = _interopRequireDefault(require("ejs"));
var _ejsMate = _interopRequireDefault(require("ejs-mate"));
var _cors = _interopRequireDefault(require("cors"));
var _passport = _interopRequireDefault(require("passport"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
require("./passport");
var _auth = _interopRequireDefault(require("./auth"));
var _faviconHandler = _interopRequireDefault(require("./utils/utilities/faviconHandler"));
var _database = _interopRequireDefault(require("./config/database"));
var _exceptionHandler = _interopRequireDefault(require("./utils/exceptions/exceptionHandler"));
var _moviesRoute = _interopRequireDefault(require("./api/routes/moviesRoute"));
var _usersRoute = _interopRequireDefault(require("./api/routes/usersRoute"));
var _genresRoute = _interopRequireDefault(require("./api/routes/genresRoute"));
var _directorsRoute = _interopRequireDefault(require("./api/routes/directorsRoute"));
var _docuRoute = _interopRequireDefault(require("./web/routes/docuRoute"));
var _corsOptions = _interopRequireDefault(require("./config/corsOptions"));
var _appErrorHandler = _interopRequireDefault(require("./utils/exceptions/appErrorHandler"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
var app = (0, _express["default"])();
//connect to the database
(0, _database["default"])();
// require your built in module

// invoking middleware
app.use((0, _cors["default"])(_corsOptions["default"]));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded());
app.use((0, _morgan["default"])('common'));
app.use((0, _expressFileupload["default"])({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));
app.use(_faviconHandler["default"]);
app.use(_express["default"]["static"]('./public'));
app.engine('ejs', _ejsMate["default"]);
app.set('view engine', 'ejs');
app.set('views', _path["default"].join(__dirname, 'views'));

// Authentication middleware
(0, _auth["default"])(app);
app.get('/', function (req, res) {
  res.send("<h1>Welcome to My-flix </h1> ".concat('\n', " <a  href=\"documentation.html\">Documentation</a"));
});

// invoking api routes
app.use('/api/v1/movies', _passport["default"].authenticate('jwt', {
  session: false
}), _moviesRoute["default"]);
app.use('/api/v1/users', _usersRoute["default"]);
app.use('/api/v1/genres', _passport["default"].authenticate('jwt', {
  session: false
}), _genresRoute["default"]);
app.use('/api/v1/directors', _passport["default"].authenticate('jwt', {
  session: false
}), _directorsRoute["default"]);

// invoking web routes
//app.use('/', docuRoute);

app.all('*', function (req, res, next) {
  next(new _exceptionHandler["default"](404, "The url ".concat(req, " could't be not found on this server")));
});
app.use(_appErrorHandler["default"]);
var _default = app;
exports["default"] = _default;