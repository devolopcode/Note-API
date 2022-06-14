/*
 * @Author: Fan Li
 * @Date: 2022-03-22 21:51:40
 * @LastEditTime: 2022-04-06 09:23:14
 * @LastEditors: Fan Li
 * @Description: null
 * @FilePath: \Code\Koa2\note\src\controller\image.js
 * @Help: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict'

const path = require('path')
const fs = require('fs')
const mimeTypes = require('mime-types')

exports.upload = async (ctx, next) => {
  let files = ctx.request.files
  if (!files) return result.failed(`未发现上传文件!`);
  try {
    const { name: name, path: filePath } = files.image
    const dest = path.join(__dirname, '../public/upload', name)
    fse.move(filePath, dest, { overwrite: true })
    ctx.response.body = result.failed(`上传文件异常!`, null, null);
  } catch (error) {
    console.log(error);
    ctx.response.body = result.failed(`上传文件出错!`, null, null);
  }
}

exports.delete = async (ctx, next) => {
  ctx.body = await remove()
}

exports.show = async (ctx, next) => {
  let filePath = path.join(__dirname, ctx.url.replace('/api/i/show', '../public/upload'))
  let file = null
  try {
    file = fs.readFileSync(filePath)
  } catch (error) {
    filePath = path.join(__dirname, '../public/upload/default.png')
    file = fs.readFileSync(filePath)
  }
  console.log('hello world')
  let mime = mimeTypes.lookup(filePath)
  ctx.set('content-type', mime)
  ctx.body = file
}