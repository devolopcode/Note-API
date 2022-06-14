/*
 * @Author: Fan Li
 * @Date: 2022-03-22 13:53:11
 * @LastEditTime: 2022-03-30 22:27:12
 * @LastEditors: Fan Li
 * @Description: null
 * @FilePath: \Code\Koa2\note\src\connection\redisConn.js
 * @Help: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const ioredis = require('ioredis')

let clientCreate = (config, callback) => {
    let redis = new ioredis(config);
    redis.on('connect', () => { //根据 connect 事件判断连接成功
        callback(null, redis) //链接成功， 返回 redis 连接对象
    })
    redis.on('error', (err) => { //根据 error 事件判断连接失败
        callback(err, null) //捕捉异常， 返回 error
    })
}

module.exports = redisConn = (options) => {
    let config = options
    return new Promise((resolve, reject) => { //返回API调用方 一个 promise 对象
        clientCreate(config, (err, conn) => {
            if (err) {
                reject(err)
            }
            resolve(conn) //返回连接的redis对象
        })
    })
}