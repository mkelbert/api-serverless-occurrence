import { expect } from 'chai';
import DB from '../../src/models/DB';

describe('DB', () => {
  afterEach(() => {
    delete global.process.env.IS_OFFLINE;
  })

  describe('Smoke test', () => {
    it('should exists static (get, getConfigDB) functions', () => {
      expect(DB.get).to.be.a('function');
      expect(DB.getConfigDB).to.be.a('function');
    });
  });

  describe('Functions', () => {
    describe('get', () => {

      it('should return object must contain (get,put,query,scan,delete) func.', () => {
        expect(DB.get().get).to.be.a('function');
        expect(DB.get().put).to.be.a('function');
        expect(DB.get().query).to.be.a('function');
        expect(DB.get().scan).to.be.a('function');
        expect(DB.get().delete).to.be.a('function');
      });

      describe('Instance (PRODUCTION)', () => {
        it('should returned object must contain production config ', () => {
          expect(DB.get().service.endpoint.href).to.not.equal('http://localhost:3000/');
        })
      })

      describe('Instance (DEVELOPER)', () => {
        it('should returned object must contain developer config ', () => {
          global.process.env.IS_OFFLINE = true;
          expect(DB.get().service.endpoint.href).to.equal('http://localhost:3000/');
        })
      })

    });

    describe('getConfigDB', () => {
      it('should returned object must contain region property on (DEV)', () => {
        expect(DB.getConfigDB()).to.have.property('region')
      })

      it('should returned object must contain region property on (PROD)', () => {
        global.process.env.IS_OFFLINE = true;
        expect(DB.getConfigDB()).to.have.property('region')
      })

      it('should returned object must contain endpoint property on (DEV)', () => {
        global.process.env.IS_OFFLINE = true;
        expect(DB.getConfigDB()).to.have.property('endpoint')
      })

      it('should returned object must not contain endpoint property on (PROD)', () => {
        expect(DB.getConfigDB()).to.not.have.property('endpoint')
      })

    });
  });
});
