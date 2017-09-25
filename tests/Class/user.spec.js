import { expect } from 'chai';

import User from '../../src/class/User';

describe('User', () => {
  describe('Smoke test', () => {
    it('should exists User class', () => {
      expect(User).to.be.a('function');
    });

    it('should exists property name', () => {
      const user = new User('kelvin', 'kelvinstang@hotmail.com');
      expect(user.name).to.exist;
    });

    it('should exists property email', () => {

    });
  });
});

