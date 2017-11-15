import DB from '../models/DB'

export default {
  register(occurrence){
    return new Promise((resolve, reject) => {
      if(!occurrence.code) return reject(new Error('#CODE_NOTFOUND'));
      if(!occurrence.email) return reject(new Error('#EMAIL_NOTFOUND'));
      if(!occurrence.latitude) return reject(new Error('#LATITUDE_NOTFOUND'));
      if(!occurrence.longitude) return reject(new Error('#LONGITUDE_NOTFOUND'));
      if(!occurrence.description) return reject(new Error('#DESCRIPTION_NOTFOUND'));

      let params = {
        TableName: 'Occurrence',
        Item: {
          code: occurrence.code,
          email: occurrence.email,
          latitude: occurrence.latitude,
          longitude: occurrence.longitude,
          description: occurrence.description
        }
      }

      DB.start().put(params, (err, data) => {
        if(err) return reject(new Error('#ERROR_REGISTER'));
        return resolve();
      });
    });
  },

  delete(occurrence) {
    return new Promise((resolve, reject) => {
      if(!occurrence.code) return reject(new Error('#CODE_NOTFOUND'));

      let params = {
        TableName: 'Occurrence',
        Key: {
          code: occurrence.code
        }
      }

      DB.start().delete(params, (err, data) => {
        if(err) {
          console.log(err)
          return reject(new Error('#ERROR_DELETE'))
        };
        return resolve();
      });
    });
  },

  findByCode(occurrence) {
    return new Promise((resolve, reject) => {
      if(!occurrence.code) return reject(new Error('#CODE_NOTFOUND'));

      let params = {
        TableName: 'Occurrence',
        Key: {
          code: occurrence.code
        }
      }

      DB.start().get(params, (err, data) => {
        if(err) {
          console.log(err)
          return reject(new Error('#OCCURRENCEDAO_FINDBYCODE'))
        };
        if(data.Item) return resolve(data.Item)
        return resolve({});
      });
    });
  },

  list(listType) {
    return new Promise((resolve, reject) => {
      if(!listType) return reject(new Error('#LISTTYPE_NOTFOUND'));

      let params = {
        TableName: 'Occurrence'
      }
      if(listType != 'all'){
        params.FilterExpression = 'email = :email'
        params.ExpressionAttributeValues = {
          ':email': listType
        }
      }

      execScan(params, [], resolve, reject);
    });
  }
}

function execScan(parm, list = [], resolve, reject) {
	DB.start().scan(parm, (err, res) => {
		if (err) return reject(`#ERRO_QUERY_${parm.TableName}`);

		res.Items.forEach(i => {
			list.push(i);
		});

		if (res.LastEvaluatedKey) {
			parm.ExclusiveStartKey = res.LastEvaluatedKey;
			return execScan(parm, list, resolve, reject);
		} else {
			return resolve(list);
		}
	});
}
