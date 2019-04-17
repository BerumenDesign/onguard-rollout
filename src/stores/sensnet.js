import 'whatwg-fetch';

const store = {
  avatar: (data) => {
    return new Promise((resolve, reject) => {
      fetch('/api/company/avatar', {
        method: 'POST',
        data
      })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    });
  }
};

export default store;
