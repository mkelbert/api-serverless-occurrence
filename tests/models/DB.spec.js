import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

sinonStubPromise(sinon);
chai.use(sinonChai);

import DB from '../../src/models/DB';

describe('DB', () => {

  // let stubedPromise;
  // let promise;

  // beforeEach(() => {
  //   stubedPromise = sinon.stub(global, 'promise');
  //   promise = stubedPromise.returnsPromise();
  // });
  afterEach(() => {
    delete global.process.env.IS_OFFLINE;
  })

  describe('Smoke test', () => {
    it('should exists get function', () => expect(DB.get).to.be.a('function'));
    it('should exists put function', () => expect(DB.put).to.be.a('function'));
    it('should exists query function', () => expect(DB.query).to.be.a('function'));
    it('should exists scan function', () => expect(DB.scan).to.be.a('function'));
    it('should exists delete function', () => expect(DB.query).to.be.a('function'));

    it('should exists static getDB function', () => expect(DB.getDB).to.be.a('function'));
    it('should exists static getConfigDB function', () => expect(DB.getConfigDB).to.be.a('function'))
  });

  describe('Functions', () => {
    describe('getDB', () => {

      it('should returned object must contain get function', () => {
        expect(DB.getDB().get).to.be.a('function');
      })
      it('should returned object must contain put function', () => {
        expect(DB.getDB().put).to.be.a('function');
      })
      it('should returned object must contain query function', () => {
        expect(DB.getDB().query).to.be.a('function');
      })
      it('should returned object must contain scan function', () => {
        expect(DB.getDB().scan).to.be.a('function');
      })
      it('should returned object must contain delete function', () => {
        expect(DB.getDB().delete).to.be.a('function');
      })

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
      it('should returned data value must contain region property on DEVELOPER stage', () => {
        expect(DB.getConfigDB()).to.have.property('region')
      })

      it('should returned data value must contain region property on PRODUCTION stage', () => {
        global.process.env.IS_OFFLINE = true;
        expect(DB.getConfigDB()).to.have.property('region')
      })

      it('should returned data value must contain endpoint property on DEVELOPER stage', () => {
        global.process.env.IS_OFFLINE = true;
        expect(DB.getConfigDB()).to.have.property('endpoint')
      })

      it('should returned data value must not contain endpoint property on PRODUCTION stage', () => {
        expect(DB.getConfigDB()).to.not.have.property('endpoint')
      })

    });

    describe('get', () => {
      it('should return Error if argument is not informed', () => {
        expect(DB.get()).to.be.a('error');
        expect(DB.get().message).to.be.equal('The argument object was not informed!');
      });

      it('should return promise', () => {
        global.fetch = require('node-fetch');
        let stubedFetch = sinon.stub(global, 'fetch');
        // let promise = stubed.returnsPromise();
        // let teste = sinon.stub(DB, 'get').callsFake(() => {
        //   return {}
        // })

        // console.log(teste)
        // var FooStub = sinon.spy(function() {
        //   return sinon.createStubInstance(DB);
        // });
        //let stubed = sinon.createStubInstance(DB);
        // promise = stubed.returnsPromise();
        //expect(DB.get({})).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk');
      });

    });
  });
});
