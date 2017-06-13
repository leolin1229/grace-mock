# grace-mock

grace-mock 扩展了[mockjs](http://mockjs.com/)接口，提供简便方式使得在开发阶段真实模拟接口请求与响应。

[![npm version](https://badge.fury.io/js/grace-mock.svg)](https://badge.fury.io/js/grace-mock)

## 特性

* 完整支持mockjs所有接口，具备mockjs所有特性
* 使用后台开发思维模拟真实接口请求与响应

## 安装

```shell
npm install grace-mock -D
```

## 用法

> mockjs接口请移步(这里)[https://github.com/nuysoft/Mock/wiki].

### CommonJS
```js
var GraceMock = require('grace-mock');

var api = {
  'GET /your/api': function(req, res) {
    var _req$query = req.query,
        pageIndex = _req$query.pageIndex,
        pageSize = _req$query.pageSize;

    var mockData = GraceMock.mock({
      code: 200,
      success: true,
      data: {
        pageIndex: +pageIndex || 1,
        pageSize: +pageSize || 50,
        total: 100,
        totalPage: Math.ceil(100 / pageSize),
        'rows|100': [{
          'id|+1': 1,
          title: '@title',
          createTime: '@datetime',
        }],
      },
    });

    res.json(mockData);
  },
};

GraceMock.$wrapper(api);
```

### ES6
```js
import GraceMock from 'grace-mock';

const api = {
  'GET /your/api'(req, res) {
    const { pageIndex, pageSize } = req.query;

    const mockData = GraceMock.mock({
      code: 200,
      success: true,
      data: {
        pageIndex: +pageIndex || 1,
        pageSize: +pageSize || 50,
        total: 100,
        totalPage: Math.ceil(100 / pageSize),
        'rows|100': [{
          'id|+1': 1,
          title: '@title',
          createTime: '@datetime',
        }],
      },
    });

    res.json(mockData);
  },
};

GraceMock.$wrapper(api);
```

## License
MIT.
