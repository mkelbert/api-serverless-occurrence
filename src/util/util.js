import crypto from 'crypto'
import _ from 'lodash'

export default {
  prepareBody(body) {
    try {
      if (_.isObject(body)) return body
      else return JSON.parse(body)
    } catch (err) {
      console.log(err)
      return {}
    }
  },

  toMd5(data) {
    return crypto.createHash('md5').update(data).digest("hex");
  },

  isEmail(email) {
    return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email);
  },

  sendLambdaResponse(status, body, callback, startDuration) {
    let object = {}

    if (!status) {
      object.statusCode = 500;
    } else {
      object.statusCode = status;
    }

    if (body) {
      object.body = body;
    } else {
      object.body = {};
    }

    object.body.duration = new Date() - startDuration;

    object.headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    };

    object.body = JSON.stringify(object.body)

    return callback(null, object)
  }
}
