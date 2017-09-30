import { expect } from 'chai';

import DB from '../../src/models/DB';

describe('DB', () => {

  afterEach(() => {
    delete global.process.env.IS_OFFLINE;
  })

  describe('Smoke test', () => {
    it('should exists get function', () => expect(new DB().get).to.be.a('function'));
    it('should exists put function', () => expect(new DB().put).to.be.a('function'));
    it('should exists query function', () => expect(new DB().query).to.be.a('function'));
    it('should exists scan function', () => expect(new DB().scan).to.be.a('function'));
    it('should exists delete function', () => expect(new DB().query).to.be.a('function'));

    it('should exists getDB function', () => expect(new DB().getDB).to.be.a('function'));
    it('should exists getConfigDB function', () => expect(new DB().getConfigDB).to.be.a('function'))
  });

  describe('Functions', () => {
    describe('getDB', () => {

      it('should returned object must contain get function', () => {
        expect(new DB().getDB().get).to.be.a('function');
      })
      it('should returned object must contain put function', () => {
        expect(new DB().getDB().put).to.be.a('function');
      })
      it('should returned object must contain query function', () => {
        expect(new DB().getDB().query).to.be.a('function');
      })
      it('should returned object must contain scan function', () => {
        expect(new DB().getDB().scan).to.be.a('function');
      })
      it('should returned object must contain delete function', () => {
        expect(new DB().getDB().delete).to.be.a('function');
      })

      describe('Instance (PRODUCTION)', () => {
        it('should returned object must contain production config ', () => {
          expect(new DB().getDB().service.endpoint.href).to.not.equal('http://localhost:3000/');
        })
      })

      describe('Instance (DEVELOPER)', () => {
        it('should returned object must contain developer config ', () => {
          global.process.env.IS_OFFLINE = true;
          expect(new DB().getDB().service.endpoint.href).to.equal('http://localhost:3000/');
        })
      })

    });

    describe('getConfigDB', () => {
      it('should returned data value must contain region property on DEVELOPER stage', () => {
        expect(new DB().getConfigDB()).to.have.property('region')
      })

      it('should returned data value must contain region property on PRODUCTION stage', () => {
        global.process.env.IS_OFFLINE = true;
        expect(new DB().getConfigDB()).to.have.property('region')
      })

      it('should returned data value must contain endpoint property on DEVELOPER stage', () => {
        global.process.env.IS_OFFLINE = true;
        expect(new DB().getConfigDB()).to.have.property('endpoint')
      })

      it('should returned data value must not contain endpoint property on PRODUCTION stage', () => {
        expect(new DB().getConfigDB()).to.not.have.property('endpoint')
      })

    })
  });
});
