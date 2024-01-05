"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserMovies = exports.updateOneUser = exports.registerUsers = exports.getOneUserByName = exports.getOneUserById = exports.getOneUser = exports.getMovieUserImage = exports.getAllUsers = exports.deleteUserMovies = exports.deleteOneUser = exports.addUserImage = exports.UserImageList = void 0;
var _sanitizeS3Objectkey = _interopRequireDefault(require("sanitize-s3-objectkey"));
var _fs = _interopRequireDefault(require("fs"));
var _exceptionHandler = _interopRequireDefault(require("../../utils/exceptions/exceptionHandler"));
var _usersModel = _interopRequireDefault(require("../../models/usersModel"));
var _s3Config = require("../../config/s3-config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getAllUsers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var users;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _usersModel["default"].find({}).populate([{
            path: 'FavoriteMovies',
            strictPopulate: false
          }]).exec();
        case 2:
          users = _context.sent;
          res.status(200).json({
            count: users.length,
            success: true,
            data: users
          });
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getAllUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getAllUsers = getAllUsers;
var registerUsers = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
    var hashedPassword, _req$body, Firstname, Lastname, Username, Email, Birthday, newUser, user, users;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _usersModel["default"].hashPassword(req.body.Password);
        case 2:
          hashedPassword = _context2.sent;
          _req$body = req.body, Firstname = _req$body.Firstname, Lastname = _req$body.Lastname, Username = _req$body.Username, Email = _req$body.Email, Birthday = _req$body.Birthday;
          if (!Email && !Username && !Firstname && !Lastname && !Password && Birthday) {
            next(new _exceptionHandler["default"](400, "Please enter all required fields"));
          }
          newUser = {
            Firstname: Firstname,
            Lastname: Lastname,
            Username: Username,
            Password: hashedPassword,
            Email: Email,
            Birthday: Birthday
          };
          _context2.next = 8;
          return _usersModel["default"].findOne({
            Email: Email
          });
        case 8:
          user = _context2.sent;
          if (user) {
            _context2.next = 16;
            break;
          }
          users = new _usersModel["default"](newUser);
          _context2.next = 13;
          return users.save();
        case 13:
          res.status(200).json({
            success: true,
            message: "Successfully registered",
            user: users
          });
          _context2.next = 17;
          break;
        case 16:
          next(new _exceptionHandler["default"](400, "Users with email: ".concat(Email, " or Username: ").concat(Username, " already been registered")));
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function registerUsers(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
exports.registerUsers = registerUsers;
var getOneUserById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var user;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _usersModel["default"].findById(req.params.Id).populate([{
            path: 'Movies',
            select: 'movies',
            strictPopulate: false
          }]);
        case 2:
          user = _context3.sent;
          res.status(201).json({
            success: true,
            data: user
          });
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getOneUserById(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getOneUserById = getOneUserById;
var getOneUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var Id, Username, user;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          Id = req.params.Id;
          Username = req.params.Username;
          _context4.next = 4;
          return _usersModel["default"].find({
            $or: [{
              _id: Id
            }, {
              Username: Username
            }]
          }).populate([{
            path: 'FavoriteMovies',
            select: 'Movies'
          }]);
        case 4:
          user = _context4.sent;
          res.status(201).json({
            success: true,
            data: user
          });
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function getOneUser(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getOneUser = getOneUser;
var getOneUserByName = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res, next) {
    var Username, user;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          Username = req.params.Username;
          _context5.next = 3;
          return _usersModel["default"].findOne({
            Username: Username
          }).populate([{
            path: 'FavoriteMovies',
            strictPopulate: false
          }]);
        case 3:
          user = _context5.sent;
          if (user) {
            res.status(201).json({
              success: true,
              data: user
            });
          } else {
            next(new _exceptionHandler["default"](404, "There was not user ".concat(Username, " found")));
          }
        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function getOneUserByName(_x10, _x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getOneUserByName = getOneUserByName;
var updateOneUser = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res, next) {
    var userName, favoritesMovies, hashedPassword, _req$body2, Firstname, Lastname, Username, Email, Birthday, body, filterUser, user;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          console.log('update', req.body);
          userName = req.params.Username;
          _context6.next = 4;
          return _usersModel["default"].findOne({
            Username: userName
          }).FavoriteMovies;
        case 4:
          favoritesMovies = _context6.sent;
          _context6.next = 7;
          return _usersModel["default"].hashPassword(req.body.Password);
        case 7:
          hashedPassword = _context6.sent;
          _req$body2 = req.body, Firstname = _req$body2.Firstname, Lastname = _req$body2.Lastname, Username = _req$body2.Username, Email = _req$body2.Email, Birthday = _req$body2.Birthday;
          body = {
            Firstname: Firstname,
            Lastname: Lastname,
            Username: Username,
            Password: hashedPassword,
            Email: Email,
            Birthday: Birthday,
            FavoriteMovies: favoritesMovies
          };
          filterUser = {
            Username: userName
          };
          _context6.next = 13;
          return _usersModel["default"].findOneAndUpdate(filterUser, body, {
            "new": true
          }).populate('FavoriteMovies');
        case 13:
          user = _context6.sent;
          if (user) {
            console.log(user);
            res.status(201).json({
              success: true,
              data: user
            });
          } else {
            next(new _exceptionHandler["default"](404, "There was not user with name: ".concat(Username, " found")));
          }
        case 15:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function updateOneUser(_x13, _x14, _x15) {
    return _ref6.apply(this, arguments);
  };
}();
exports.updateOneUser = updateOneUser;
var updateUserMovies = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res, next) {
    var _req$params, MovieId, Username, body, filterUser, user;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          console.log(req.params);
          _req$params = req.params, MovieId = _req$params.MovieId, Username = _req$params.Username;
          body = {
            FavoriteMovies: MovieId
          };
          filterUser = {
            Username: Username
          };
          _context7.next = 6;
          return _usersModel["default"].findOneAndUpdate(filterUser, {
            $push: body
          }, {
            "new": true
          }).populate('FavoriteMovies');
        case 6:
          user = _context7.sent;
          if (user) {
            res.status(201).json({
              message: 'Movie was successfully updated',
              success: true,
              data: user
            });
          } else {
            next(new _exceptionHandler["default"](404, "There was not movie with name: ".concat(Username, " found")));
          }
        case 8:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function updateUserMovies(_x16, _x17, _x18) {
    return _ref7.apply(this, arguments);
  };
}();
exports.updateUserMovies = updateUserMovies;
var deleteUserMovies = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res, next) {
    var _req$params2, MovieId, Username, body, filter, user;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _req$params2 = req.params, MovieId = _req$params2.MovieId, Username = _req$params2.Username;
          body = {
            FavoriteMovies: MovieId
          };
          filter = {
            Username: Username
          };
          _context8.next = 5;
          return _usersModel["default"].findOneAndUpdate(filter, {
            $pull: body
          }, {
            "new": true
          });
        case 5:
          user = _context8.sent;
          if (user) {
            res.status(201).json({
              success: true,
              message: 'User favorite movies was successfully deleted',
              data: user
            });
          } else {
            next(new _exceptionHandler["default"](404, "There was no user with name: ".concat(Username, " found")));
          }
        case 7:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function deleteUserMovies(_x19, _x20, _x21) {
    return _ref8.apply(this, arguments);
  };
}();
exports.deleteUserMovies = deleteUserMovies;
var deleteOneUser = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res, next) {
    var Username, user;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          Username = req.params.Username;
          _context9.next = 3;
          return _usersModel["default"].findOneAndRemove({
            Username: Username
          });
        case 3:
          user = _context9.sent;
          if (user) {
            res.status(201).json({
              success: true,
              message: "User with ".concat(Username, " has been successfully deleted"),
              data: user
            });
          } else {
            next(new _exceptionHandler["default"](404, "There was not user with name ".concat(Username, " found")));
          }
        case 5:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function deleteOneUser(_x22, _x23, _x24) {
    return _ref9.apply(this, arguments);
  };
}();
exports.deleteOneUser = deleteOneUser;
var UserImageList = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res, next) {
    var userId, files;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          userId = req.params.userId;
          _context10.next = 3;
          return (0, _s3Config.UserImageLists)(process.env.DEST_NAME, "resized-images/users/".concat(userId));
        case 3:
          files = _context10.sent;
          if (userId) {
            res.status(200).json({
              success: true,
              message: 'Object list fetched successfully',
              files: files
            });
          } else {
            next(new _exceptionHandler["default"](500, "Input data could not be found"));
          }
        case 5:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function UserImageList(_x25, _x26, _x27) {
    return _ref10.apply(this, arguments);
  };
}();
exports.UserImageList = UserImageList;
var addUserImage = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res, next) {
    var userId, file, name, fileName, fileContent, response;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          userId = req.params.userId;
          file = req.files.file;
          name = "users/".concat(userId, "/").concat(file.name);
          fileName = (0, _sanitizeS3Objectkey["default"])(name);
          fileContent = _fs["default"].readFileSync(file.tempFilePath);
          if (!file) {
            _context11.next = 13;
            break;
          }
          console.log(_s3Config.addUserImages);
          _context11.next = 9;
          return (0, _s3Config.addUserImages)(fileContent, fileName);
        case 9:
          response = _context11.sent;
          res.status(201).json({
            success: true,
            message: 'Object uploaded successfully',
            data: response
          });
          _context11.next = 14;
          break;
        case 13:
          next(new _exceptionHandler["default"](500, "Error occurred uploading file"));
        case 14:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function addUserImage(_x28, _x29, _x30) {
    return _ref11.apply(this, arguments);
  };
}();
exports.addUserImage = addUserImage;
var getMovieUserImage = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var objectKey, fileName, response, stream;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          objectKey = req.params.objectKey;
          fileName = objectKey.split('/').pop();
          console.log(objectKey, fileName);
          _context12.next = 5;
          return (0, _s3Config.getMovieUserImages)(objectKey);
        case 5:
          response = _context12.sent;
          stream = response.Body;
          _context12.t0 = _fs["default"];
          _context12.t1 = "/tmp/".concat(fileName);
          _context12.t2 = Buffer;
          _context12.next = 12;
          return stream.toArray();
        case 12:
          _context12.t3 = _context12.sent;
          _context12.t4 = _context12.t2.concat.call(_context12.t2, _context12.t3);
          _context12.t0.writeFileSync.call(_context12.t0, _context12.t1, _context12.t4);
          res.status(200).sendFile("/tmp/".concat(fileName));
          res.status(403).json({
            success: false,
            message: "Error occurred during fetching file. ".concat(error)
          });
        case 17:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function getMovieUserImage(_x31, _x32) {
    return _ref12.apply(this, arguments);
  };
}();
exports.getMovieUserImage = getMovieUserImage;