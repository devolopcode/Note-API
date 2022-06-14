/*
 * @Author: Fan Li
 * @Date: 2022-03-14 13:22:34
 * @LastEditTime: 2022-03-22 21:35:19
 * @LastEditors: Fan Li
 * @Description: null
 * @FilePath: \Code\Koa2\note\src\model\user.js
 * @Help: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  openid: {
    unique: true,
    type: String
  },
  lastLogin: {
    type: Date,
    default: Date.now()
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    }
  }
})

UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = Date.now()
  }
  next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User