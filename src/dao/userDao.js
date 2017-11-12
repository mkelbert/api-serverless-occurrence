import DB from '../models/DB'
import util from '../util/util'

export default {
  register(user, authenticator){
    return new Promise((resolve, reject) => {
      if(!user.email) return reject(new Error('#ERROR_USERDAO_REGISTER_EMAIL_NOTFOUND'));
      if(!user.password) return reject(new Error('#ERROR_USERDAO_REGISTER_PASSWORD_NOTFOUND'));
      if(!user.authenticator) return reject(new Error('#ERROR_USERDAO_REGISTER_AUTHENTICATOR_NOTFOUND'));

      let params = {
        TableName: 'User',
        Item: {
          email: user.email,
          password: util.toMd5(user.password),
          authenticator: user.authenticator
        }
      }

      DB.start().put(params, (err, data) => {
        if(err) return reject(new Error('#ERROR_USERDAO_REGISTER'));
        return resolve();
      });
    });
  },

  findByEmail(user) {
    return new Promise((resolve, reject) => {
      if(!user.email) return reject(new Error('#ERROR_USERDAO_FINDBYEMAIL_EMAIL_NOTFOUND'));

      let params = {
        TableName: 'User',
        Key: {
          email: user.email
        }
      }

      DB.start().get(params, (err, data) => {
        if(err) {
          console.log(err)
          return reject(new Error('#ERROR_USERDAO_FINDBYEMAIL'))
        };
        if(data.Item) return resolve(data.Item)
        return resolve({});
      });
    });
  },

  findByAuthenticate(user){
    return new Promise((resolve, reject) => {
      if(!user.email) return reject(new Error('#ERROR_USERDAO_FINDBYAUTHENTICATE_EMAIL_NOTFOUND'));
      if(!user.password) return reject(new Error('#ERROR_USERDAO_FINDBYAUTHENTICATE_PASSWORD_NOTFOUND'));

      let params = {
        TableName: 'User',
        KeyConditionExpression: 'email = :email',
        FilterExpression: 'password = :password',
        ExpressionAttributeValues: {
          ':email': user.email,
          ':password': user.password
        }
      }

      DB.start().query(params, (err, data) => {
        if(err) {
          console.log(err)
          return reject(new Error('#ERROR_USERDAO_FINDBYAUTHENTICATE'))
        };
        if(data.Items && data.Items[0]) return resolve(data.Items[0])
        return resolve({});
      });
    });
  },

  findByAuthenticator(user){
    return new Promise((resolve, reject) => {
      if(!user.authenticator) return reject(new Error('#ERROR_USERDAO_FINDBYAUTHENTICATOR_AUTHENTICATOR_NOTFOUND'));

      let params = {
        TableName: 'User',
        FilterExpression: 'authenticator = :authenticator',
        ExpressionAttributeValues: {
          ':authenticator': user.authenticator
        }
      }

      DB.start().scan(params, (err, data) => {
        if(err) {
          console.log(err)
          return reject(new Error('#ERROR_USERDAO_FINDBYAUTHENTICATOR'))
        };
        if(data.Items && data.Items[0]) return resolve(data.Items[0])
        return resolve({});
      });
    });
  },

  updateAuthenticator(user) {
    return new Promise((resolve, reject) => {
      if(!user.email) return reject(new Error('#ERROR_USERDAO_UPDATEAUTHENTICATOR_EMAIL_NOTFOUND'));
      if(!user.authenticator) return reject(new Error('#ERROR_USERDAO_UPDATEAUTHENTICATOR_AUTHENTICATOR_NOTFOUND'));

      let params = {
        TableName: 'User',
        Key: {
          email: user.email
        },
        UpdateExpression: 'set authenticator = :authenticator',
        ExpressionAttributeValues: {
          ':authenticator' : user.authenticator
        }
      }

      DB.start().update(params, (err, data) => {
        if(err) {
          console.log(err)
          return reject(new Error('#ERROR_USERDAO_UPDATEAUTHENTICATOR'))
        };
        return resolve({});
      });
    })
  }
}
