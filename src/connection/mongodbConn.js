/*
 * @Author: Fan Li
 * @Date: 2022-03-30 22:15:32
 * @LastEditTime: 2022-03-30 22:22:20
 * @LastEditors: Fan Li
 * @Description: null
 * @FilePath: \Code\Koa2\note\src\connection\mongodb.js
 * @Help: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const { DB_ADDRESS } = require('../config/index')

module.exports = mongooseConn = mongoose.connect(DB_ADDRESS, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
  if (err) {
    console.log({ msg: '[Mongoose] database connect failed!', err })
  } else {
    console.log('[Mongoose] database connect success!')
  }
})