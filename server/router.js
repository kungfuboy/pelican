const fs = require('fs')
const Router = require('koa-router')
const router = new Router()
const { readDirSync, printError } = require('./utils/index')
const client = require('./aimPath') // 目标文件夹
const { parseAST } = require('jabber-parse')
const prettier = require('prettier')

const TemplateHash = new Map().set(1, 'table.vue').set(2, 'form.vue')

router
  .get('/allPath', (ctx, next) => {
    ctx.response.type = 'json'
    ctx.response.body = { data: readDirSync(client) }
  })
  .get('/getFile', (ctx, next) => {
    const { path } = ctx.query
    const [_format] = path.split('.').slice(-1)
    const content = fs.readFileSync(path, { encoding: 'utf-8' }, printError)
    ctx.response.type = 'json'
    ctx.response.body = {
      data: content ? content : '// 该文件没有内容',
      format: _format
    }
  })
  .post('/addFile', (ctx, next) => {
    const { path, data, name, id } = ctx.request.body
    const code = data
      ? parseAST([data])
      : fs.readFileSync(`./template/${TemplateHash.get(id)}`, {
          encoding: 'utf-8'
        })
    fs.writeFile(
      `${path}/${name}.vue`,
      prettier.format(code, { semi: false, parser: 'vue' }),
      'utf8',
      printError
    )
    ctx.response.type = 'json'
    ctx.response.body = {
      status: 200,
      data: '创建完成'
    }
  })
  .post('/rewriteFile', (ctx, next) => {
    // req
    const { path, data } = ctx.request.body
    console.log(parseAST(data))
    const code = parseAST(data)
    fs.writeFile(
      `${path}`,
      prettier.format(code, { semi: false, parser: 'vue' }),
      'utf8',
      printError
    )
    // res
    ctx.response.type = 'json'
    ctx.response.body = {
      status: 200,
      data: prettier.format(code, { semi: false, parser: 'vue' })
    }
  })

module.exports = router
