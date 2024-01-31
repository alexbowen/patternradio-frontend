export const request = async (url, params = {}, responseType = 'json') => {
  const request = await fetch(`${url}?${new URLSearchParams(params)}`);
  return await request[responseType]();
}

// const Api = class {

//   // constructor(params = {}) {
//   //   // this.params = params;
//   // }

//   request(url, params = {}, responseType = 'json') {
//     return request(url, params, responseType)
//   }
// };

const api = {
  request,
};

export default api;
