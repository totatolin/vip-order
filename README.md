# vip-order

> VIP发货2017版

- 本仓库建立在node 6.6.0基础上，请注意切换版本！--nvm use 6.6.0

# Requirements
1.  vue2.1+es6
2.  熟悉ES6并使用ES6编写

# Table of Contents
- src/目录下是开发文件
- App.vue是程序的入口
- components/下存放公共组件
- order/下存放所有的页面
- routes/index.js 路由地址
- config/env/development.json 测试环境接口地址
- config/env/production.json 正式环境接口地址

# Dependencies
- 项目依赖
  - [axios](https://github.com/mzabriskie/axios)
  - [moment](http://momentjs.cn/)
  - [lodash](https://lodash.com/)
  - [vue-wechat-title](https://github.com/deboyblog/vue-wechat-title)

# Usage
- ```npm i```
- PS：缺少模块的报错，请运行 ```npm i [module]```

# Start
- 本地运行 ```npm run dev```
- 本地线上环境 ```npm run prod```

# Build
- 测试环境打包 ```npm run build-dev```
- 正式环境打包 ```npm run build-prod ```

# Depoly
- 项目部署(尚未部署)
  

# Run unit tests
- ```npm run unit```

# Run e2e tests
- ```npm run e2e```

# Run all tests
- ```npm test```