import AWS from 'aws-sdk';

export default class DB {
  get() { }
  put() { }
  query() { }
  scan() { }
  delete() { }

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
