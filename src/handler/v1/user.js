import DB from '../../models/DB';
import project from '../../project';

module.exports.new = (event, context, callback) => {

  let parmQuery = {
    TableName: project.config().TABLE_USER,
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': 'kelvinstang@hotmail.com'
    }
  }

  console.log(event.body.nick)

  DB.get().query(parmQuery).promise()
  .then(res => checkUserExist(res))
  .then(() => end(200, event, callback))
  .catch(err => {
    end(500, err, callback)
  });
}

function checkUserExist(res){
  if(!res.Items) return Promise.reject('#ERROR_NEW_USER');
  if(res.Items && res.Items.length == 0 )
    return Promise.resolve();
  else
    return Promise.reject('#USER_ALREADY_REGISTERED');
}

function end(statusCode, obj, callback){
  callback(null, {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    body: JSON.stringify(obj)
  })
}
