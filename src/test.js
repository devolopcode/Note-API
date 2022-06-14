/*
 * @Author: Fan Li
 * @Date: 2022-03-24 11:22:58
 * @LastEditTime: 2022-03-24 11:35:56
 * @LastEditors: Fan Li
 * @Description: null
 * @FilePath: \Code\Koa2\note\src\test.js
 * @Help: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require("tencentcloud-sdk-nodejs");

const NlpClient = tencentcloud.nlp.v20190408.Client;

const clientConfig = {
  credential: {
    secretId: "SecretId",
    secretKey: "SecretKey",
  },
  region: "ap-guangzhou",
  profile: {
    httpProfile: {
      endpoint: "nlp.tencentcloudapi.com",
    },
  },
};

const client = new NlpClient(clientConfig);
const params = {
  "Text": "我想吃一个苹果",
  "Num": 5
};
client.KeywordsExtraction(params).then(
  (data) => {
    console.log(data);
  },
  (err) => {
    console.error("error", err);
  }
);