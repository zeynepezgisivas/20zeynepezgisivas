import { mockReactNativeFirestore } from 'firestore-jest-mock';
import * as api from '../services/api';
import { waitFor } from '@testing-library/react-native';

mockReactNativeFirestore({
  database: {
    users: [
      {"id":"diZqYcp7jZFn8qUgOalE","userName":"Cagrı","password":"12345678"},
      {"id":"mfU12DAF67QIooMG9Et0","userName":"Ali","password":"1234567"},
      {"id":"roCGOruDxAf1Aa9CXaJi","userName":"ezgi","password":"123456"}
    ],
  },
});

jest.mock('../services/api', () => ({
  getUsers: jest.fn().mockResolvedValueOnce([
    {"id":"diZqYcp7jZFn8qUgOalE","userName":"Cagrı","password":"12345678"},
    {"id":"mfU12DAF67QIooMG9Et0","userName":"Ali","password":"1234567"},
    {"id":"roCGOruDxAf1Aa9CXaJi","userName":"ezgi","password":"123456"}
  ]),
}));

test('Kullanıcılar içerisinde oguzhan kullanısına ait bir kullanıcı var mı?', async () => {

  const users = await api.getUsers();
  
  expect(users.map(user => user.userName)).toEqual(
    expect.arrayContaining(['ezgi'])
  );
});
