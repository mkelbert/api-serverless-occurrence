'use strict';

module.exports.new = function (event, context, callback) {
  var response = {
    statusCode: 200,
    headers: {
      "x-custom-header": "My Header Value"
    },
    body: JSON.stringify({ "message": "Hello World!" })
  };

  callback(null, response);
};