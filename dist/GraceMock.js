'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mockjs = require('mockjs');

var _mockjs2 = _interopRequireDefault(_mockjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function serialize(str) {
  var paramArray = str.split('&');
  var query = {};
  paramArray.forEach(function (item) {
    query[item.split('=')[0]] = item.split('=')[1];
  });

  return query;
}

exports.default = _extends({}, _mockjs2.default, {
  $wrapper: function $wrapper(apiObject) {
    Object.keys(apiObject).forEach(function (key) {
      _mockjs2.default.mock(eval('/' + key.split(' ')[1].replace(/\//g, '\\/') + '/'), key.split(' ')[0].toLowerCase(), function (options) {
        var query = { options: options };
        if (key.split(' ')[0].toLowerCase() === 'get') {
          if (options.url.split('?')[1]) {
            query = serialize(options.url.split('?')[1]);
          } else {
            query = options.body ? JSON.parse(options.body) : {};
          }
        }
        var res = {};
        var result = {};
        res.json = function ret(data) {
          result = data;
        };
        apiObject[key](_extends({}, options, { query: query }), res);

        return result;
      });
    });
  }
});
