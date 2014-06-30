var express = require('express')
var port = process.env.PORT || 80
var app = express()
var routes = require('./routes')
var mongoose = require('mongoose')

mongoose.connect('mongodb://admin:admin@localhost:27017/admin')
app.set('views','./views')
app.set('view engine','jade')
app.use(express.static('./public'))
app.use(express.bodyParser({
    uploadDir: __dirname + '/upload',
    keepExtensions: true,
    limit: '50mb'
}))
app.listen(port)
routes(app)


console.log('服务启动了,监听端口：'+port)






