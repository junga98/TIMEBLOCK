import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import history from 'connect-history-api-fallback'
import config from '../../build/webpack.dev.conf'

import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import router from './router/index'

const app = express()
let server = require('http').createServer(app);

// 引入history模式让浏览器进行前端路由页面跳转
app.use(history())

app.use(logger('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}))
app.use(webpackHotMiddleware(compiler))

app.use(express.static(path.join(__dirname, 'views')))
app.get('/', function (req, res) {
  res.sendFile('./views/index.html')
})

router(app)

// 设置监听端口
const SERVER_PORT = 4300
server.listen(SERVER_PORT, () => {
  console.info(`服务已经启动，监听端口${SERVER_PORT}`)
})

export default app