import DB from '../models/DB'
import util from '../util/util'

export default {
  register(occurrence){
    return new Promise((resolve, reject) => {
      if(!occurrence.code) return reject(new Error('#ERROR_OCCURRENCEDAO_REGISTER_CODE_NOTFOUND'));
      if(!occurrence.email) return reject(new Error('#ERROR_OCCURRENCEDAO_REGISTER_EMAIL_NOTFOUND'));
      if(!occurrence.latitude) return reject(new Error('#ERROR_OCCURRENCEDAO_REGISTER_LATITUDE_NOTFOUND'));
      if(!occurrence.longitude) return reject(new Error('#ERROR_OCCURRENCEDAO_REGISTER_LONGITUDE_NOTFOUND'));
      if(!occurrence.description) return reject(new Error('#ERROR_OCCURRENCEDAO_REGISTER_DESCRIPTION_NOTFOUND'));

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
        if(err) return reject(new Error('#ERROR_OCCURRENCEDAO_REGISTER'));
        return resolve();
      });
    });
  },
}
