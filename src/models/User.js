import crypto from 'crypto';
import project from '../project';
import DB from './DB'

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
    }).promise();
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
