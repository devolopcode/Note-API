/*
 * @Author: Fan Li
 * @Date: 2022-03-30 22:05:55
 * @LastEditTime: 2022-04-06 14:45:58
 * @LastEditors: Fan Li
 * @Description: null
 * @FilePath: \Code\Koa2\note\src\controller\common.js
 * @Help: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { redis_db0 } = require('../handler/redisHandler')

exports.getOpenid = async (thirdSessionId) => {
  console.log(thirdSessionId)
  let res = await redis_db0.getString(thirdSessionId)
  console.log(res)
  if (res) {
    try {
      // let openid = JSON.parse(res).openid
      let openid = JSON.parse(res).openid
      console.log(openid)
      return openid
    } catch (error) {
      return null
    }
  }
}