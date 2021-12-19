import { getResponse } from '../src/hello';

test('hello', () => {
  expect(getResponse().statusCode).toBe(200);
});
