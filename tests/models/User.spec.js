import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
sinonStubPromise(sinon);
chai.use(sinonChai);

import User from '../../src/models/User';
import DB from '../../src/models/DB';

describe('User', () => {

  const fakeDB = {
    update: function() {
      return {
        promise: () => Promise.resolve({})
      }
    }
  };

  describe('Smoke test', () => {

    describe('properties', () => {
      it('should exists User class', () => expect(new User()).to.be.exist);

      it('should exists property name', () => expect(new User()).to.have.property('name'));
      it('should exists property email', () => expect(new User).to.have.property('email'));
      it('should exists property token', () => expect(new User()).to.have.property('token'));
      it('should exists property password', () => expect(new User()).to.have.property('password'));

    });

    describe('Functions', () => {
      it('should exists function save', () => expect(new User().save).to.be.a('function'));
    });
  });

  describe('Constructor', () => {
    it('should accepts parameter loading by options object', () => {
      let user = new User({
        name: 'Test Name',
        email: 'test@email.com.br',
        password: '12345'
      });

      expect(user.name).to.be.eql('Test Name');
      expect(user.email).to.be.eql('test@email.com.br');
      expect(user.password).to.be.eql('827ccb0eea8a706c4c34a16891f84e7b')
    })
  })

  describe('Properties', () => {
    describe('email', () => {
      it('should save and return the correct data (lowerCase)', () => {
        const user = new User({
          email: 'TeSt@eMail.coM.br'
        });

        expect(user.email).to.be.eql('test@email.com.br')
      });
    });

    describe('password', () => {
      it('should save and return the correct data (MD5)', () => {
        const user = new User({
          password: 12345
        });
        expect(user.password).to.be.eql('827ccb0eea8a706c4c34a16891f84e7b')
      })
    });
  });

  describe('Function', () => {
    describe('save', () => {
      it('should return promise', () => {
        let user = new User({
          name: 'Test Name',
          email: 'test@email.com.br',
          password: '12345'
        }, fakeDB);

        expect(user.save()).to.be.a('promise');
      });
    });

    describe('createToken', () => {
      it('should return new token', () => {
        let user = new User(null, null);
        expect(user.createToken()).to.be.a('string');
      });
    });

    describe('updateToken', () => {
      it('should return error', () => {
        let user = new User({}, fakeDB);
        expect(user.updateToken()).to.be.a('error');
      });

      it('should return promise', () => {
        let user = new User({
          name: 'Test Name',
          email: 'test@email.com.br',
          password: '12345'
        }, fakeDB);

        expect(user.updateToken()).to.be.a('promise');
      });
    });
  });

});
