/*
 * @Author: Fan Li
 * @Date: 2022-03-11 13:25:22
 * @LastEditTime: 2022-04-06 14:29:46
 * @LastEditors: Fan Li
 * @Description: null
 * @FilePath: \Code\Koa2\note\src\controller\user.js
 * @Help: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict'

const mongoose = require('mongoose')
const User = mongoose.model('User')
const { v4: uuidv4 } = require('uuid');
const result = require('../lib/Result')
const { getSession } = require('../service/weixin')
const { redis_db0 } = require('../handler/redisHandler')
exports.signup = async (ctx, next) => {
  let openid;
  let session_key;
  let thirdSessionId;
  ctx.body = ctx.request.body
  await getSession(ctx.request.body).then((session) => {
    openid = session.openid
    session_key = session.session_key
  }, (err) => {
    console.log(error)
    ctx.response.body = result.failed(err, null, null)
  })
  console.log(openid)
  let user = await User.findOne({
    openid: openid
  }).exec()
  if (!user) {
    thirdSessionId = uuidv4()
    user = new User({
      openid: openid,
      lastLogin: Date.now()
    })
    try {
      user = await user.save()
      let key = thirdSessionId
      let value = { openid, session_key }
      let res = redis_db0.setString(key, JSON.stringify(value))
      if (res !== null && user) {
        console.log('插入成功')
      } else {
        ctx.response.body = result.failed('1 注册失败', null, null)
      }
      console.log(thirdSessionId)
      ctx.response.body = result.success('注册成功', {
        thirdSessionId
      })
    } catch (e) {
      console.log(e)
      ctx.response.body = result.failed('2 注册失败', null, null)
    }
  } else {
    thirdSessionId = uuidv4()
    try {
      let key = thirdSessionId
      let value = { openid, session_key }
      let res = redis_db0.setString(key, JSON.stringify(value))
      if (res) {
        console.log('test' + thirdSessionId)
        ctx.response.body = result.success('登录成功', {
          thirdSessionId
        })
      } else {
        ctx.response.body = result.failed('登录失败', null, null)
      }
    } catch (e) {
      ctx.response.body = result.failed('redis 错误', null, null)
    }
  }
}

