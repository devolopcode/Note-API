/*
 * @Author: Fan Li
 * @Date: 2022-03-15 22:10:05
 * @LastEditTime: 2022-03-30 14:15:21
 * @LastEditors: Fan Li
 * @Description: null
 * @FilePath: \Code\Koa2\note\src\router\index.js
 * @Help: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict'

const Router = require('koa-router')
const User = require('../controller/user')
const Note = require('../controller/note')
const Image = require('../controller/image')
const App = require('../controller/app')

module.exports = function () {
  var router = new Router({
    prefix: '/api'
  })
  // user
  router.post('/u/signup', App.hasBody, User.signup)

  // note
  router.post('/n/upload', App.hasSession, App.hasBody, Note.upload)
  router.get('/n/select', App.hasSession, Note.select)
  router.get('/n/selectOne', Note.selectOne)
  router.post('/n/save', Note.save)

  // image
  router.post('/i/upload', Image.upload)
  router.get('/i/show/:url', Image.show)

  return router
}