"use strict";

var _app = _interopRequireDefault(require("./app"));
var _http = _interopRequireDefault(require("http"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
var port = process.env.PORT || 5000;
var server = _http["default"].createServer(_app["default"]);
server.listen(port, function () {
  return console.log("[ Server ]: running on port http://localhost:".concat(port));
});