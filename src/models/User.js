import crypto from 'crypto';
import uuid from 'uuid';
import _ from 'lodash';
import project from '../project';
import DB from './DB';

export default class User {
  constructor(options, dynamo = DB.get()) {
    if (options) {
      this.name = options.name;
      this.email = options.email;
      this.password = options.password;
    }
    this.dynamo = dynamo;
  }

  /**
   * FUNCTIONS
   */
  save(){
    return this.dynamo.update({
      TableName: project.TABLE_USER,
      Key: {
        email: this.email
      },
      UpdateExpression: 'set nick = :name, email = :email, password = :password',
      ExpressionAttributeValues: {
        ':name' : this.name,
        ':email': this.email,
        ':password': this.password
      }
    }).promise()
  }

  updateToken(){
    if(this.email == 'undefined') return new Error('#USER_EMAIL_NOTFOUND')

    return this.dynamo.update({
      TableName: project.TABLE_USER,
      Key: {
        email: this.email
      },
      UpdateExpression: 'set token = :token',
      ExpressionAttributeValues: {
        ':token' : this.createToken()
      }
    }).promise()
  }

  createToken(){
    return crypto.createHash('md5').update(String(uuid.v1())).digest('hex');
  }

  /**
   * GETTERS AND SETTERS
   */
  set email(email) {
    this._email = String(email).toLowerCase();
  }
  get email() {
    return this._email;
  }

  set token(token) {
    this._token = String(token);
  }
  get token() {
    return this._token;
  }

  set name(name) {
    this._name = String(name);
  }
  get name() {
    return this._name;
  }

  set password(password) {
    this._password = crypto.createHash('md5').update(String(password)).digest('hex');
  }
  get password() {
    return this._password;
  }
}
