#! /usr/bin/env node

const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const router = require('./router')
const app = new Koa()

app
  .use(cors()) // 允许跨域
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

// 监听
app.listen(3030, () => {
  console.log('Listening 3030...')
})
