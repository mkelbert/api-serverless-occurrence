import { expect } from 'chai';

import User from '../../src/models/User';

describe('User', () => {
  describe('Smoke test', () => {
    it('should exists User class', () => expect(new User()).to.be.a('object'));

    it('should exists property name', () => expect(new User()).to.have.property('name'));

    it('should exists property email', () => expect(new User).to.have.property('email'));

    it('should exists property token', () => expect(new User()).to.have.property('token'));

    it('should exists property created', () => expect(new User()).to.have.property('created'));

    it('should exists property password', () => expect(new User()).to.have.property('password'));

    it('should exists function login', () => expect(new User().login).to.be.a('function'));
  });

  describe('Property password', () => {
    it('should return the correct data from set value (MD5)', () => {
      const user = new User();
      user.password = '12345';
      expect(user.password).to.be.eq('827ccb0eea8a706c4c34a16891f84e7b')
    })
  })

  describe('Constructor', () => {
    it('should set property name', () => {
      const user = new User({
        name: 'Kelvin Oenning'
      });
      expect(user.name).to.be.equal('Kelvin Oenning')
    })

    it('should set property email', () => {
      const user = new User({
        email: 'kelvinstang@hotmail.com'
      });
      expect(user.email).to.be.equal('kelvinstang@hotmail.com')
    })

    it('should set property password', () => {
      const user = new User({
        password: '12345'
      });
      expect(user.password).to.be.equal('827ccb0eea8a706c4c34a16891f84e7b')
    })
  })
});
