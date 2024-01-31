import {jest} from '@jest/globals'

export const request = (url) => {
  console.log('mockRequest')
  return new Promise((resolve, reject) => {
    const userID = parseInt(url.slice('/users/'.length), 10);
    process.nextTick(() =>
      users[userID]
        ? resolve('mock response')
        : reject({
            error: `User with ${userID} not found.`,
          }),
    );
  });
}

// export default { request: mockRequest };




// export const mockRequest = jest.fn();


// const mock = jest.fn().mockImplementation(() => {
//   return { request: mockRequest };
// });

export default request;

