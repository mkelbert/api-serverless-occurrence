import util from '../util/util'
import uuid from 'uuid'

export default class Ocurrence {
  constructor(options) {
    if (options) {
      this.email = options.email;
      this.code = options.code;
      this.latitude = options.latitude;
      this.longitude = options.longitude;
      this.description = options.description;
    }
  }

  updateCode() {
    this.code = util.toMd5(uuid.v4().toString() + new Date().toJSON());
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

  set code(code) {
    this._code = String(code);
  }
  get code() {
    return this._code;
  }

  set latitude(latitude) {
    this._latitude = String(latitude)
  }
  get latitude() {
    return this._latitude;
  }

  set longitude(longitude) {
    this._longitude = String(longitude)
  }
  get longitude() {
    return this._longitude;
  }

  set description(description){
    this._description = description;
  }
  get description(){
    return this._description;
  }
}
