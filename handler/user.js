'use strict';

const config = require('../config.js');
const AWS = require('aws-sdk')
const crypto = require('crypto');
const DB = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10', region: 'us-east-1'});

module.exports.new = (event, context, callback) => {
  userIsNotExists('kelvinstang@hotmail.com')
  .then(res => create('kelvinstang@hotmail.com', 'Kelvin Oenning', '100110'))
  .then(() => resp(200, {}, callback))
  .catch(err => resp(500, err, callback))
};

module.exports.login = (event, contex, callback) => {

}









function resp(statusCode, obj, callback){
  callback(null, {
    statusCode,
    res: obj
  })
}

function userIsNotExists(email){
  return new Promise((resolve, reject) => {
    getUser(email)
    .then(res => {
      if(res.Items.length > 0) return reject('#USER_EXISTS');
      return resolve();
    })
  }) 
}

/**
 * FUNÇÕES TEMPORÁRIAS PARA INTERAÇÃO COM A BASE DE DADOS
 */

function getUser(email){
  return DB.query({
    TableName: config.location().tableUser,
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email
    }
  }).promise()
}

function create(email, name, password){
  DB.put({
    TableName: config.location().tableUser,
    Item: {
      email,
      name,
      password: crypto.createHash('md5').update(password).digest("hex")
    }
  }).promise()
}