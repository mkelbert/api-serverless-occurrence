import AWS from 'aws-sdk';

export default class DB {
  create() { }
  update() { }
  delete() { }

  getDB() {
    if(process.env.IS_OFFLINE) return {put:function(){}};
    return new AWS.DynamoDB.DocumentClient();
  }
}
