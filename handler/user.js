'use strict';

const config = require('../config.js');
const AWS = require('aws-sdk')
const DB = new AWS.DynamoDB({apiVersion: '2012-08-10'});

module.exports.new = (event, context, callback) => {
  DB.putItem({
    TableName: 'DB_USER_TESTE1',
    Item: {
      email: 'kelvinstang@hotmail.com',
      name: 'kelvin oenning'
    }
  }, (err, data) => {
    if(err){
      return resp(500, err, callback);
    }
    return resp(200, {message: 'Adicionado com sucesso'}, callback);
  })
};

let resp = (statusCode, obj, callback) => {
  callback(null, {
    statusCode,
    body: obj
  })
}