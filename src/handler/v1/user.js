import User from '../../models/User';
import userDao from '../../dao/userDao';
import util from '../../util/util';


module.exports.register = (event, context, callback) => {
  let args = util.prepareBody(event.body);

  if(!args.email || !args.password || !util.isEmail(args.email) || args.password.length < 5) return util.sendLambdaResponse(400, undefined, callback);

  let user = new User({
    email: args.email,
    password: args.password
  })

  userDao.findByEmail(user)
  .then(findUser => {
    if(findUser.email) return util.sendLambdaResponse(200, undefined, callback);
    user.updateAuthenticator();
    Promise.resolve();
  })
  .then(() => userDao.register(user))
  .then(() => {
    return util.sendLambdaResponse(201, {
      authenticator: user.authenticator
    }, callback)
  })
  .catch(err => {
    console.log(err)
    return util.sendLambdaResponse(500, undefined, callback);
  })
}

module.exports.authenticate = (event, context, callback) => {
  let args = util.prepareBody(event.body);

  if(!args.email || !args.password || !util.isEmail(args.email) || args.password.length < 5) return util.sendLambdaResponse(400, undefined, callback);

  let user = new User({
    email: args.email,
    password: util.toMd5(args.password)
  })

  userDao.findByAuthenticate(user)
  .then(findUser => {
    if(!findUser.email) return util.sendLambdaResponse(401, undefined, callback)
    user.updateAuthenticator();
    Promise.resolve();
  })
  .then(() => userDao.updateAuthenticator(user))
  .then(() => util.sendLambdaResponse(200, {
    authenticator: user.authenticator
  }, callback))
  .catch(err => {
    console.log(err)
    return util.sendLambdaResponse(500, undefined, callback);
  })
}
