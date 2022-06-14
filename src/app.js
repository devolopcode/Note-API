/*
 * @Author: Fan Li
 * @Date: 2022-03-09 15:30:04
 * @LastEditTime: 2022-04-06 14:14:41
 * @LastEditors: Fan Li
 * @Description: null
 * @FilePath: \Code\Koa2\note\src\app.js
 * @Help: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict'

const path = require('path')
const Koa = require('koa')
const logger = require('koa-logger')
const session = require('koa-session')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const parameter = require('koa-parameter')
const error = require('koa-json-error')

const cors = require('./middleware/cors')
const mongooseConn = require('./connection/mongodbConn')
const User = require('./model/user')
const Note = require('./model/note')
const router = require('./router/index')()

const app = new Koa()

require('babel-register')
app.use(cors);
app.use(koaStatic(path.join(__dirname, "public")));
app.use(
  error({
    postFormat: (e, { stack, ...rest }) => {
      process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
    }
  })
)
app.use(logger())
app.use(session(app))
app.use(koaBody({
  multipart: true,
  formLimit: 200 * 1024 * 1024
}))
app.use(parameter(app))
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8080, () => {
  console.log('app started at port 8080...')
})
