/*
 * @Author: Fan Li
 * @Date: 2022-03-22 06:58:47
 * @LastEditTime: 2022-03-29 11:00:35
 * @LastEditors: Fan Li
 * @Description: null
 * @FilePath: \Code\Koa2\note\src\config\index.js
 * @Help: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const APPID = 'wx909f50d56919e970'
const APPSECRET = 'f889c8e4d1609017d71b39ab90630366'
const DB_ADDRESS = 'mongodb://note:note@127.0.0.1:27017/note?authSource=note&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'; // 数据库地址
const REDIS_CONFIG = {
  port: 6379,
  host: '127.0.0.1',
  password: 'foobared',
  db: 0,
  family: 4
};

module.exports = { APPID, APPSECRET, DB_ADDRESS, REDIS_CONFIG }