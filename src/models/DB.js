import AWS from 'aws-sdk';

export default class DB {
  get() {
    // return this.getDB().put({
    //   TableName: 'User',
    //   Item: {
    //     email: 'kelvin@adapcon.com.br',
    //     nome: 'Kelvin Oenning'
    //   }
    // }).promise()
  }
  put() { }
  query() { }
  scan() { }
  delete() {}

  getDB() {
    return new AWS.DynamoDB.DocumentClient(this.getConfigDB());
  }

  getConfigDB(){
    if(process.env.IS_OFFLINE == true) return {
      region: 'localhost',
      endpoint: 'http://localhost:3000'
    }

    return { region: 'us-east-1' }
  }
}
