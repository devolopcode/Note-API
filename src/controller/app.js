/*
 * @Author: Fan Li
 * @Date: 2022-03-23 22:20:49
 * @LastEditTime: 2022-04-06 18:25:09
 * @LastEditors: Fan Li
 * @Description: null
 * @FilePath: \Code\Koa2\note\src\controller\app.js
 * @Help: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const { redis_db0 } = require('../handler/redisHandler')
const result = require('../lib/result')

/**
 * POST 请求参数校验
 * @param {*} ctx 
 * @param {*} next 
 */
exports.hasBody = async (ctx, next) => {
  const body = ctx.request.body || {}
  console.log(body)
  if (Object.keys(body).length === 0) {
    ctx.response.body = result.failed('某参数缺失', null, null)
  }

  await next()
}

/**
 * thirdSessionId 校验
 * @param {*} ctx 
 * @param {*} next 
 */
exports.hasSession = async (ctx, next) => {
  console.log(ctx.response.header)
  const thirdSessionId = ctx.request.header.authorization
  if (!thirdSessionId) {
    ctx.response.body = result.failed('令牌失效', null, null)
  }
  let res = await redis_db0.getString(thirdSessionId)

  if (!res) {
    ctx.response.body = result.failed('用户没登陆', null, null)
  }

  await next()
}