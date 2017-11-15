import User from '../../models/User';
import userDao from '../../dao/userDao';
import util from '../../util/util';
import _ from 'lodash';


module.exports.register = (event, context, callback) => {
  let startDuration = new Date();
  let args = util.prepareBody(event.body);

  if(args == null || !args.email ||
    !args.password ||
    !util.isEmail(args.email) ||
    args.password.length < 5) return util.sendLambdaResponse(400, undefined, callback, startDuration);

  let user = new User({
    email: args.email,
    password: args.password
  })

  userDao.findByEmail(user)
  .then(findUser => new Promise((resolve, reject) => {
    if(_.get(findUser, 'email')) return util.sendLambdaResponse(200, undefined, callback, startDuration);
    user.updateAuthenticator();
    resolve();
  }))
  .then(() => userDao.register(user))
  .then(() => {
    return util.sendLambdaResponse(201, {
      authenticator: user.authenticator
    }, callback, startDuration)
  })
  .catch(err => {
    console.log(err)
    return util.sendLambdaResponse(500, undefined, callback, startDuration);
  })
}

module.exports.authenticate = (event, context, callback) => {
  let startDuration = new Date();
  let args = util.prepareBody(event.body);

  if(args == null || !args.email ||
    !args.password ||
    !util.isEmail(args.email) ||
    args.password.length < 5) return util.sendLambdaResponse(400, undefined, callback, startDuration);

  let user = new User({
    email: args.email,
    password: util.toMd5(args.password)
  })

  userDao.findByAuthenticate(user)
  .then(findUser => new Promise((resolve, reject) => {
    if(!_.get(findUser, 'email')) return util.sendLambdaResponse(401, undefined, callback, startDuration)
    user.updateAuthenticator();
    resolve();
  }))
  .then(() => userDao.updateAuthenticator(user))
  .then(() => util.sendLambdaResponse(200, {
    authenticator: user.authenticator
  }, callback, startDuration))
  .catch(err => {
    console.log(err)
    return util.sendLambdaResponse(500, undefined, callback, startDuration);
  })
}
