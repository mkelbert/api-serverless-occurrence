'use strict';

module.exports.new = (event, context, callback) => {

  let arr = [1,2,3,4,5,6,7];
  let newarr = [];
  arr.map(i => newarr.push(i))

  const response = {
    statusCode: 200,
    headers: {
      "x-custom-header": "My Header Value"
    },
    body: newarr
  };

  callback(null, response);
}