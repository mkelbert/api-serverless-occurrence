import AWS from 'aws-sdk';

export default class DB {
  get(arg) { }
  put(arg) { }
  query(arg) { }
  scan(arg) { }
  delete(arg) { }

  getDB() {
    return new AWS.DynamoDB.DocumentClient(this.getConfigDB());
  }

  getConfigDB() {
    if (process.env.IS_OFFLINE) return {
      region: 'localhost',
      endpoint: 'http://localhost:3000'
    };

    return { region: 'us-east-1' };
  }
}
