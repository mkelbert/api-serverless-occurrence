import Occurrence from '../../models/Occurrence';
import User from '../../models/User';
import occurrenceDao from '../../dao/occurrenceDao';
import userDao from '../../dao/userDao';
import util from '../../util/util';
import _ from 'lodash';


module.exports.register = (event, context, callback) => {
  let startDuration = new Date();
  let authenticator = _.get(event, 'headers.authenticator');
  let args = util.prepareBody(event.body);

  if(args == null || !authenticator ||
    !args.latitude ||
    !args.longitude ||
    !args.description) return util.sendLambdaResponse(400, undefined, callback, startDuration);

  let user = new User({
    authenticator
  })
  let occurrence;

  userDao.findByAuthenticator(user)
  .then(findUser => new Promise((resolve, reject) => {
    if(!_.get(findUser, 'email')) return util.sendLambdaResponse(403, undefined, callback, startDuration);
    user.email = findUser.email;

    occurrence = new Occurrence({
      email : user.email,
      latitude: args.latitude,
      longitude: args.longitude,
      description: args.description
    });
    occurrence.updateCode();

    resolve();
  }))
  .then(() => occurrenceDao.register(occurrence))
  .then(() => {
    return util.sendLambdaResponse(201, {
      code: occurrence.code
    }, callback, startDuration)
  })
  .catch(err => {
    console.log(err)
    return util.sendLambdaResponse(500, undefined, callback, startDuration);
  })
}

module.exports.delete = (event, context, callback) => {
  let startDuration = new Date()
  let authenticator = _.get(event, 'headers.authenticator');
  let args = util.prepareBody(event.body);

  if(args == null || !args.code || !authenticator) return util.sendLambdaResponse(400, undefined, callback, startDuration);

  let user = new User({
    authenticator
  })
  let occurrence;

  userDao.findByAuthenticator(user)
  .then(findUser => new Promise((resolve, reject) => {
    if(!_.get(findUser, 'email')) return util.sendLambdaResponse(403, undefined, callback, startDuration);
    user.email = findUser.email;

    occurrence = new Occurrence({
      code: args.code
    });
    resolve();
  }))
  .then(() => occurrenceDao.findByCode(occurrence))
  .then(findOccurrence => new Promise((resolve, reject) => {
    if(!findOccurrence.email) return util.sendLambdaResponse(404, undefined, callback, startDuration);
    if(findOccurrence.email != user.email) return util.sendLambdaResponse(401, undefined, callback, startDuration);
    resolve();
  }))
  .then(() => occurrenceDao.delete(occurrence))
  .then(() => {
    return util.sendLambdaResponse(200, undefined, callback, startDuration)
  })
  .catch(err => {
    console.log(err)
    return util.sendLambdaResponse(500, undefined, callback, startDuration);
  })
}

module.exports.list = (event, context, callback) => {
  let startDuration = new Date();
  let authenticator = _.get(event, 'headers.authenticator');
  let userFind = _.get(event, 'headers.user');

  if(!authenticator) return util.sendLambdaResponse(400, undefined, callback, startDuration);

  let user = new User({
    authenticator
  })
  let listType;

  userDao.findByAuthenticator(user)
  .then(findUser => new Promise((resolve, reject) => {
    if(!_.get(findUser, 'email')) return util.sendLambdaResponse(403, undefined, callback, startDuration);
    user.email = findUser.email;

    if(!userFind) listType = user.email;
    else if(userFind == 'all') listType = 'all'
    else listType = userFind

    resolve();
  }))
  .then(() => occurrenceDao.list(listType))
  .then(listOccurrence => {
    return util.sendLambdaResponse(200, {
      date: new Date().toJSON(),
      user: listType,
      objects: listOccurrence
    }, callback, startDuration)
  })
  .catch(err => {
    console.log(err)
    return util.sendLambdaResponse(500, undefined, callback, startDuration);
  })
}
