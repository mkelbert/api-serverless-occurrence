import AWS from 'aws-sdk';

export default class DB {
  static start() {
    return new AWS.DynamoDB.DocumentClient({
      region: 'sa-east-1'
    });
  }
}
