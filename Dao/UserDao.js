'use strict'

const config = require('../config.js');
const AWS = require('aws-sdk')
const crypto = require('crypto');
const DB = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10', region: 'us-east-1'});

module.exports = class UserDao{
    constructor(){}

    save(){

    }
    
    delete(){

    }

    find(){

    }
}