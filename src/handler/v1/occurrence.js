import Occurrence from '../../models/Occurrence';
import occurrenceDao from '../../dao/occurrenceDao';
import userDao from '../../dao/userDao';
import util from '../../util/util';


module.exports.register = (event, context, callback) => {
  let authenticator = event.headers.authenticator;
  let args = util.prepareBody(event.body);

  if(!authenticator ||
    !args.latitude ||
    !args.longitude ||
    !args.description) return util.sendLambdaResponse(400, undefined, callback);

  let user = new User({
    authenticator
  })
  let occurrence;

  userDao.findByAuthenticator(user)
  .then(findUser => {
    if(!findUser.email) return util.sendLambdaResponse(401, undefined, callback);
    user.email = findUser.email;

    occurrence = new Occurrence({
      email : user.email,
      latitude: args.latitude,
      longitude: args.longitude,
      description: description
    });
    occurrence.updateCode();

    Promise.resolve();
  })
  .then(() => occurrenceDao.register(occurrence))
  .then(() => {
    return util.sendLambdaResponse(201, {
      code: occurrence.code
    }, callback)
  })
  .catch(err => {
    console.log(err)
    return util.sendLambdaResponse(500, undefined, callback);
  })
}
