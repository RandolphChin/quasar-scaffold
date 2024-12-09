export const fakeBackend = {
  login(credentials) {
    const { username, password } = credentials;
    if (username === 'admin' && password === 'password') {
      return Promise.resolve({
        token: 'fake-jwt-token',
        user: { id: 1, username: 'admin', name: 'Administrator' },
      });
    }
    return Promise.reject('Invalid username or password');
  },
  getUser() {
    return Promise.resolve({ id: 1, username: 'admin', name: 'Administrator' });
  },
};
