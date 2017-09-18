'use strict';

module.exports.new = (event, context, callback) => {
  if(!event.email || !event.password)
  resp(200, {message: 'teste'}, callback);
};

let resp = (statusCode, obj, callback) => {
  callback(null, {
    statusCode,
    body: JSON.stringify(obj)
  })
}