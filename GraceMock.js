import Mock from 'mockjs';

function serialize(str) {
  const paramArray = str.split('&');
  const query = {};
  paramArray.forEach((item) => {
    query[item.split('=')[0]] = item.split('=')[1];
  });

  return query;
}

export default {
  ...Mock,
  $wrapper(apiObject) {
    Object.keys(apiObject).forEach((key) => {
      Mock.mock(eval(`/${key.split(' ')[1].replace(/\//g, '\\/')}/`), key.split(' ')[0].toLowerCase(), (options) => { // eslint-disable-line no-eval
        let query = { options };
        if (key.split(' ')[0].toLowerCase() === 'get') {
          if (options.url.split('?')[1]) {
            query = serialize(options.url.split('?')[1]);
          } else {
            query = options.body ? JSON.parse(options.body) : {};
          }
        }
        const res = {};
        let result = {};
        res.json = function ret(data) {
          result = data;
        };
        apiObject[key]({ ...options, query }, res);

        return result;
      });
    });
  },
};
