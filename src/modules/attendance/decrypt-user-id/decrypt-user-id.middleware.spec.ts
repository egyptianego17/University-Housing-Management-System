import { DecryptUserIdMiddleware } from './decrypt-user-id.middleware';

describe('DecryptUserIdMiddleware', () => {
  it('should be defined', () => {
    expect(new DecryptUserIdMiddleware()).toBeDefined();
  });
});
