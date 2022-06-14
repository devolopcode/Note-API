/*
 * @Author: Fan Li
 * @Date: 2022-03-30 22:19:19
 * @LastEditTime: 2022-03-30 22:19:19
 * @LastEditors: Fan Li
 * @Description: null
 * @FilePath: \Code\Koa2\note\src\middleware\cors.js
 * @Help: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = cors = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  ctx.set('Access-Control-Allow-Credentials', 'true');
  if (ctx.method == 'OPTIONS') {
    ctx.response.body = 200;
  } else {
    await next();
  }
}