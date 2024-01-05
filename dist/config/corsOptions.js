"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var allowedOrigins = ['http://localhost:1234', 'https://myflixx.netlify.app', 'http://localhost:4200', 'https://alejandrobryan.com', 'http://my-flixx-images-bucket.s3.eu-central-1.amazonaws.com'];
var _default = {
  credentials: true,
  origin: function origin(_origin, callback) {
    if (!_origin) return callback(null, true);
    if (allowedOrigins.indexOf(_origin) === -1) {
      // If a specific origin isn’t found on the list of allowed origins
      var message = 'The CORS policy for this application doesn’t allow access from origin ' + _origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
};
exports["default"] = _default;