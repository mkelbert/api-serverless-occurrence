import crypto from 'crypto';

export default class User {
  set email(email) {
    this._email = email;
  }
  get email() {
    return this._email;
  }

  set token(token) {
    this._token = token;
  }
  get token() {
    return this._token;
  }

  set name(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }

  set created(created) {
    this._created = created;
  }
  get created() {
    return this._created;
  }

  set password(password) {
    this._password = crypto.createHash('md5').update(password).digest('hex');
  }
  get password() {
    return this._password;
  }
}
