import { expect } from 'chai';

import User from '../../src/class/User';

describe('User', () => {
  describe('Smoke test', () => {
    it('should exists User class', () => expect(User).to.be.a('function'));

    it('should exists property name', () => expect(new User()).to.have.property('name'));

    it('should exists property email', () => expect(new User).to.have.property('email'));

    it('should exists property token', () => expect(new User()).to.have.property('token'));

    it('should exists property created', () => expect(new User()).to.have.property('created'));

    it('should exists property password', () => expect(new User()).to.have.property('password'));
  });

  describe('Set password', () => {
    it('should return the correct data from set value (MD5)', () => {
      const user = new User();
      user.password = '12345';
      expect(user.password).to.be.eq('827ccb0eea8a706c4c34a16891f84e7b')
    })
  })
});
