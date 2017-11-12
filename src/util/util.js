import crypto from 'crypto'

export default {
  prepareBody(body) {
    try{
      return JSON.parse(body)
    } catch(err) {
      return {}
    }
  },

  toMd5(data){
    return crypto.createHash('md5').update(data).digest("hex");
  },

  isEmail(email){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  },

  sendLambdaResponse(status, body, callback){
    let object = {}
    if(!status) object.statusCode = 500;
    else object.statusCode = status;

    if(body) object.body = JSON.stringify(body);

    object.headers = {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    };

    callback(null, object)
  }
}
