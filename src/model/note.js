/*
 * @Author: Fan Li
 * @Date: 2022-03-22 21:35:41
 * @LastEditTime: 2022-03-27 23:07:25
 * @LastEditors: Fan Li
 * @Description: null
 * @FilePath: \Code\Koa2\note\src\model\note.js
 * @Help: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NoteSchema = new Schema({
  openid: {
    type: String
  },
  title: {
    type: String
  },
  contents: {
    type: Array
  },
  stick: {
    type: Boolean,
    default: false
  },
  makePublic: {
    type: Boolean,
    default: false
  },
  editTime: {
    type: String
  },
  meta: {
    createAt: {
      type: Date
    },
    updateAt: {
      type: Date
    }
  }
})

NoteSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})


const Note = mongoose.model('Note', NoteSchema)

module.exports = Note