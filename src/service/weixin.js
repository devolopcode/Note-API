/*
 * @Author: Fan Li
 * @Date: 2022-03-30 21:58:03
 * @LastEditTime: 2022-04-06 14:24:20
 * @LastEditors: Fan Li
 * @Description: null
 * @FilePath: \Code\Koa2\note\src\service\weixin.js
 * @Help: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { APPID, APPSECRET } = require('../config/index')
const request = require('request')
const crypto = require('crypto')
const { redis_db0 } = require('../handler/redisHandler')

module.exports = {
  async getSession(info) {
    return new Promise((resolve, reject) => {
      const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${APPSECRET}&js_code=${info.code}&grant_type=authorization_code`
      request(url, {
        method: 'GET',
        json: true
      }, (err, res) => {
        console.log(err)
        if (err) {
          reject(err)
        } else {
          if (res.body.errcode) {
            reject(res.body.errmsg)
          } else {
            resolve(res.body)
          }
        }
      })
    }).catch((err) => {
      console.log(err)
    })
  },

  async getToken() {
    return redis_db0.getString('token').then((token) => {
      return new Promise((resolve, reject) => {
        console.log('hello2')
        if (token) {
          console.log('hell1')
          resolve(token)
        } else {
          const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`
          request(
            url,
            {
              method: 'GET',
              json: true
            },
            (err, res) => {
              console.log(err)
              if (err) {
                reject(err)
              } else {
                if (res.body.errcode) {
                  reject(err.body.errmsg)
                } else {
                  token = res.body.access_token
                  let r = redis_db0.setString('token', token, 7000)
                  if (r) {
                    resolve(token)
                  } else {
                    reject(r)
                  }
                }
              }
            }
          )
        }
      })
    }, (err) => {
      console.log(err)
    })
  }
}