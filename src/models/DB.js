import AWS from 'aws-sdk';

export default class DB {
  static get(arg, db = this.getDB()) {
    if(!arg) return new Error('The argument object was not informed!');
    return db.get(arg).promise();
  }

  static put(arg, db = this.getDB()) {
    if(!arg) return new Error('The argument object was not informed!');
    return db.put(arg).promise();
  }

  static query(arg, db = this.getDB()) {
    if(!arg) return new Error('The argument object was not informed!');
    return db.query(arg).promise();
  }

  static scan(arg, db = this.getDB()) {
    if(!arg) return new Error('The argument object was not informed!');
    return db.scan(arg).promise();
  }

  static delete(arg, db = this.getDB()) {
    if(!arg) return new Error('The argument object was not informed!');
    return db.delete(arg).promise();
  }

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
