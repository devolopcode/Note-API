/*
 * @Author: Fan Li
 * @Date: 2022-04-06 12:49:02
 * @LastEditTime: 2022-04-06 14:53:31
 * @LastEditors: Fan Li
 * @Description: null
 * @FilePath: \Code\Koa2\note\src\handler\redisHandler.js
 * @Help: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const redisConn = require('../connection/redisConn')
const ioredis = require('ioredis')
const { REDIS_CONFIG } = require('../config/index')
const { default: redis } = require('ioredis/built/redis')

class redisHandler {
  redis
  config
  constructor(opt) {
    this.redis = null;
    if (opt) {
      this.config = Object.assign(REDIS_CONFIG, opt)
    } else {
      this.config = REDIS_CONFIG
    }
    // this.connToRedis()
    this.connToRedis().then(res => {
      if (res) {
        console.log('redis connet success')
      }
    }).catch(e => {
      console.error('The Redis Can not Connect:' + e)
    })
  }

  /**连接redis */
  connToRedis() {
    return new Promise((resolve, reject) => {
      if (this.redis) {
        resolve(true) //已创建
      } else {
        redisConn(this.config).then((resp) => {
          this.redis = resp
          resolve(true)
        }
        ).catch(err => { reject(err) })
      }
    })
  }

  /**存储string类型的key-value */
  async setString(key, value) {
    console.log('helo ' + key)
    let val = typeof (value) !== 'string' ? JSON.stringify(value) : value;
    let k = typeof (value) !== 'string' ? JSON.stringify(key) : key;
    try {
      const res = await this.redis.set(k, val);
      return res;
    }
    catch (e) {
      console.error(e);
    }
  }

  /**获取string类型的key-value */
  async getString(key) {
    let id = typeof (key) !== 'string' ? JSON.stringify(key) : key;
    try {
      let res = await this.redis.get(id);
      return res;
    } catch (e) {
      console.error(e);
      return null
    }
  }

  /**删除string类型的key-value */
  async delString(key) {
    let id = typeof (key) !== 'string' ? JSON.stringify(key) : key;
    try {
      const res = await this.redis.del(id);
      return res
    } catch (e) {
      console.error(e);
      return null
    }
  }

  /**获取当前数据库key的数量 */
  async getDbSize() {
    try {
      const res = await this.redis.dbsize();
      return res
    } catch (e) {
      console.error(e);
      return null
    }
  }

}

exports.redis_db0 = new redisHandler();
/*
需要用到多少个数据库，就定义多少个实例常量，这样的好处是:
每次个模块调用redis的时候，始终是取第一次生成的实例，避免了多次连接redis的尴尬
*/
// module.exports = redis_db1 = new redisHandler({ db: 1 })
// export const redis_db2 = new RedisTool({db:2})
// export const redis_db3 = new RedisTool({db:3})
// export const redis_db4 = new RedisTool({db:4})