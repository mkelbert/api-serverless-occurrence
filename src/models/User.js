import util from '../util/util'
import uuid from 'uuid'

export default class User {
  constructor(options) {
    if (options) {
      this.email = options.email;
      this.password = options.password;
      this.authenticator = options.authenticator;
    }
  }

  updateAuthenticator() {
    this.authenticator = util.toMd5(uuid.v4().toString() + new Date().toJSON());
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

  set authenticator(authenticator) {
    this._authenticator = String(authenticator);
  }
  get authenticator() {
    return this._authenticator;
  }

  set password(password) {
    this._password = String(password)
  }
  get password() {
    return this._password;
  }
}
