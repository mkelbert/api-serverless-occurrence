import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
sinonStubPromise(sinon);
chai.use(sinonChai);

describe('Handler V1 User', () => {
  let fn = require('../../../src/handler/v1/user');

  describe('new', () => {
    it('should return function', () => {
      expect(fn.new).to.be.a('function');
    });
  })

  // describe('checkArgsToNew', () => {
  //   it('should return function', () => {
  //     expect(fn.)
  //   })
  // })
});
