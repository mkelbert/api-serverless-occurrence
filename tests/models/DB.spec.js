import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

sinonStubPromise(sinon);
chai.use(sinonChai);

import DB from '../../src/models/DB';

describe('DB', () => {

  let stubedGet, stubedPut, stubedScan, stubedQuery, stubedDelete;
  let promiseGet, promisePut, promiseScan, promiseQuery, promiseDelete;

  beforeEach(() => {
    stubedGet = sinon.stub(DB, 'get');
    stubedPut = sinon.stub(DB, 'put');
    stubedScan = sinon.stub(DB, 'scan');
    stubedQuery = sinon.stub(DB, 'query');
    stubedDelete = sinon.stub(DB, 'delete');
    promiseGet = stubedGet.returnsPromise();
    promisePut = stubedPut.returnsPromise();
    promiseScan = stubedScan.returnsPromise();
    promiseQuery = stubedQuery.returnsPromise();
    promiseDelete = stubedDelete.returnsPromise();
  });
  afterEach(() => {
    delete global.process.env.IS_OFFLINE;
    stubedGet.restore();
    stubedPut.restore();
    stubedScan.restore();
    stubedQuery.restore();
    stubedDelete.restore();
  })

  describe('Smoke test', () => {
    it('should exists static (get, put, query, scan, delete) functions', () => {
      expect(DB.get).to.be.a('function');
      expect(DB.put).to.be.a('function');
      expect(DB.query).to.be.a('function');
      expect(DB.scan).to.be.a('function');
      expect(DB.delete).to.be.a('function');
    });

    it('should exists static (getDB, getConfigDB) functions', () => {
      expect(DB.getDB).to.be.a('function');
      expect(DB.getConfigDB).to.be.a('function');
    });
  });

  describe('Functions', () => {
    describe('getDB', () => {

      it('should returned AWS object must contain (get, put, query, scan, delete) functions', () => {
        expect(DB.getDB().get).to.be.a('function');
        expect(DB.getDB().put).to.be.a('function');
        expect(DB.getDB().query).to.be.a('function');
        expect(DB.getDB().scan).to.be.a('function');
        expect(DB.getDB().delete).to.be.a('function');
      });

      describe('Instance (PRODUCTION)', () => {
        it('should returned object must contain production config ', () => {
          expect(DB.getDB().service.endpoint.href).to.not.equal('http://localhost:3000/');
        })
      })

      describe('Instance (DEVELOPER)', () => {
        it('should returned object must contain developer config ', () => {
          global.process.env.IS_OFFLINE = true;
          expect(DB.getDB().service.endpoint.href).to.equal('http://localhost:3000/');
        })
      })

    });

    describe('getConfigDB', () => {
      it('should returned data value must contain region property on DEVELOPER config', () => {
        expect(DB.getConfigDB()).to.have.property('region')
      })

      it('should returned data value must contain region property on PRODUCTION config', () => {
        global.process.env.IS_OFFLINE = true;
        expect(DB.getConfigDB()).to.have.property('region')
      })

      it('should returned data value must contain endpoint property on DEVELOPER config', () => {
        global.process.env.IS_OFFLINE = true;
        expect(DB.getConfigDB()).to.have.property('endpoint')
      })

      it('should returned data value must not contain endpoint property on PRODUCTION config', () => {
        expect(DB.getConfigDB()).to.not.have.property('endpoint')
      })

    });

    describe('get', () => {
      it('should return Error if argument is not informed', () => {
        stubedGet.restore();
        expect(DB.get()).to.be.a('error');
        expect(DB.get().message).to.be.equal('The argument object was not informed!');
      });

      it('should return promise', () => {
        let promiseResult = { Item: {} }
        promiseGet.resolves(promiseResult);
        expect(DB.get({}).resolveValue).to.be.eql(promiseResult);
      });

    });

    describe('put', () => {
      it('should return Error if argument is not informed', () => {
        stubedPut.restore();
        expect(DB.put()).to.be.a('error');
        expect(DB.put().message).to.be.equal('The argument object was not informed!');
      });

      it('should return promise', () => {
        let promiseResult = { }
        promisePut.resolves(promiseResult);
        expect(DB.put({}).resolveValue).to.be.eql(promiseResult);
      });

    });

    describe('query', () => {
      it('should return Error if argument is not informed', () => {
        stubedQuery.restore();
        expect(DB.query()).to.be.a('error');
        expect(DB.query().message).to.be.equal('The argument object was not informed!');
      });

      it('should return promise', () => {
        let promiseResult = { Items: {} }
        promiseQuery.resolves(promiseResult);
        expect(DB.query({}).resolveValue).to.be.eql(promiseResult);
      });

    });

    describe('scan', () => {
      it('should return Error if argument is not informed', () => {
        stubedScan.restore();
        expect(DB.scan()).to.be.a('error');
        expect(DB.scan().message).to.be.equal('The argument object was not informed!');
      });

      it('should return promise', () => {
        let promiseResult = { Items: {} }
        promiseScan.resolves(promiseResult);
        expect(DB.scan({}).resolveValue).to.be.eql(promiseResult);
      });

    });

    describe('delete', () => {
      it('should return Error if argument is not informed', () => {
        stubedDelete.restore();
        expect(DB.delete()).to.be.a('error');
        expect(DB.delete().message).to.be.equal('The argument object was not informed!');
      });

      it('should return promise', () => {
        let promiseResult = {}
        promiseDelete.resolves(promiseResult);
        expect(DB.delete({}).resolveValue).to.be.eql(promiseResult);
      });

    });
  });
});
