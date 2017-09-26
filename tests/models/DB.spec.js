import { expect } from 'chai';

import DB from '../../src/models/DB';

describe('DB', () => {
  describe('Smoke test', () => {
    it('should exists DB class', () => expect(new DB()).to.be.a('object'));

    it('should exists create function', () => expect(new DB().create).to.be.a('function'));
    it('should exists update function', () => expect(new DB().update).to.be.a('function'));
    it('should exists delete function', () => expect(new DB().delete).to.be.a('function'));

    it('should exists getDB function', () => expect(new DB().getDB).to.be.a('function'));
  });

  describe('functions', () => {
    describe('getDB', () => {
      it('should return data value equals object', () => {
        expect(new DB().getDB()).to.be.a('object');
      })

      it('should returned object must contain the function put (PROD)', () => {
        expect(new DB().getDB().put).to.be.a('function');
      })

      it('should returned object must contain the function put (DEV)', () => {
        global.process.env.IS_OFFLINE = true;
        expect(new DB().getDB().put).to.be.a('function');
      })
    });
  });
});
