/*
 * @Author: Fan Li
 * @Date: 2022-03-21 06:54:59
 * @LastEditTime: 2022-04-06 18:34:04
 * @LastEditors: Fan Li
 * @Description: null
 * @FilePath: \Code\Koa2\note\src\controller\note.js
 * @Help: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict'

const request = require('request')
const crypto = require('crypto')

const Note = require('../model/note')
const result = require('../lib/result')
const { redis_db0 } = require('../handler/redisHandler')
const { getOpenid } = require('./common')

exports.upload = async (ctx, next) => {
  const openid = await getOpenid(ctx.request.header.authorization)
  ctx.body = ctx.request.body
  const { title, contents, editTime } = ctx.body
  contents.forEach((item, index) => {
    if (typeof item.insert == "object" && item.insert.image.match(/^http\:\/\/tmp.*$/)) {
      contents[index].insert.image = "http://127.0.0.1:8080/api/i/show/" + item.insert.image.replace("http://tmp/", "")
    }
  })
  let note = Note({
    openid: openid,
    title: title,
    contents: contents,
    editTime: editTime
  })
  await note.save()
  ctx.response.body = result.success(
    '上传成功', null, null
  )
}

exports.select = async (ctx, next) => {
  const openid = await getOpenid(ctx.request.header.authorization)
  let notes = await Note.find({ openid: openid }, {
    _id: 1,
    contents: 1,
    editTime: 1,
    stick: 1,
    title: 1
  }).exec()
  if (notes) {
    ctx.response.body = result.success(null, notes)
  } else {
    ctx.response.body = result.failed(null, null, null)
  }
}

exports.selectOne = async (ctx, next) => {
  const openid = await getOpenid(ctx.request.header.authorization)
  let _id = ctx.request.query._id
  let note = await Note.findOne({ openid: openid, _id: _id }, {
    _id: 1,
    contents: 1,
    editTime: 1,
    stick: 1,
    title: 1
  }).exec()
  if (note) {
    ctx.response.body = result.success(null, note, null)
  } else {
    ctx.response.body = result.failed(null, null, null)
  }
}

exports.save = async (ctx, next) => {
  const openid = await getOpenid(ctx.request.header.authorization)
  ctx.body = ctx.request.body
  console.log(openid)
  let { title, contents } = ctx.body
  contents.forEach((item) => {
    console.log(item)
    if (typeof item.insert == "object") {
      item.insert.image = "http://127.0.0.1:8080/api/i/show/" + item.insert.image.replace("http://tmp", "")
      console.log(item.insert.image)
    }
  })
  let note = new Note({
    openid: openid,
    title: title,
    contents: contents,
    editTime: editTime
  })
  note = await note.save()
  if (note) {
    ctx.response.body = result.success("上传成功", null)
  } else {
    ctx.response.body = result.failed('上传失败', null, null)
  }
}

exports.update = async (ctx, next) => {
  const openid = await getOpenid(ctx.request.header.authorization)
  ctx.body = ctx.request.body
  let { _id, title, contents } = ctx.body
  contents.forEach((item) => {
    console.log(item)
    if (typeof item.insert == "object") {
      item.insert.image = "http://127.0.0.1:8080/api/i/show/" + item.insert.image.replace("http://tmp", "")
      console.log(item.insert.image)
    }
  })
  let res = await Note.updateOne({_id,openid},)
  if (note) {
    ctx.response.body = result.success("上传成功", null)
  } else {
    ctx.response.body = result.failed('上传失败', null, null)
  }
}

exports.delete = async (ctx, next) => {

}

exports.stick = async (ctx, next) => {

}

exports.makePublic = async (ctx, next) => {

}

exports.star = async (ctx, next) => {

}