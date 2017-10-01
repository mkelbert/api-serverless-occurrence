import AWS from 'aws-sdk';

export default class DB {
  static get(arg, db = this.getDB()) {
    console.log('tentei executar')
    if(!arg) return new Error('The argument object was not informed!');
    return db.get(arg).promise();
  }

  static put(arg) { }
  static query(arg) { }
  static scan(arg) { }
  static delete(arg) { }

  static getDB(config = this.getConfigDB()) {
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
