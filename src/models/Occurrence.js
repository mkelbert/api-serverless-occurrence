import util from '../util/util'

export default class Ocurrence {
  constructor(options) {
    if (options) {
      this.email = options.email;
      this.code = option.code;
      this.latitude = option.latitude;
      this.longitude = option.longitude;
      this.description = option.description;
    }
  }

  updateCode() {
    if(!this.email) return Promise.reject();
    if(!this.code) code = util.toMd5(this.email + new Date().toJSON());
    return Promise.resolve();
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
