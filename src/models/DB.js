import AWS from 'aws-sdk';

export default class DB {
  static get(config = this.getConfigDB()) {
    return new AWS.DynamoDB.DocumentClient(config);
  }

  static getConfigDB() {
    if (process.env.IS_OFFLINE) return {
      region: 'localhost',
      endpoint: 'http://localhost:3000'
    };

    return { region: 'us-east-1' };
  }
}
