var WebModel = require('../model/websites.js')
var CateModel = require('../model/category.js')
var UserModel = require('../model/user.js')

module.exports = function(app){

	app.get('/',function(req,res){


        CateModel.find({})
                .populate({
                    path : 'list',
                    select : 'title url'
                })
                .sort('time')
                .exec(function(err,doc){
                    console.log(doc)
                    if (err) return console.log(err)

                        res.render('index',{
                            title : '首页',
                            data : doc
                        })
                })


	})


    app.get('/reg',function(req,res){

        res.render('reg',{
            title:'注册'
        })

    })

    app.get('/login',function(req,res){

        res.render('login',{
            title:'登录'
        })

    })

	app.get('/add',function(req,res){

        CateModel.find({}).exec(function(err,doc) {
            if (err) return console.log(err)
            res.render('add',{
                title:'添加新网址',
                data : doc
            })
        })

	})

    app.get('/addCate',function(req,res){
        CateModel.find({}).sort('time').exec(function(err,doc){
            if (err) return console.log(err)
            res.render('addCate',{
                title : '添加新分类',
                data : doc
            })
        })

    })

    app.get('/cate/:id',function(req,res){
        var id = req.params.id

        CateMode.findById(id)
            .populate({
                path : 'list',
                select : 'title url'
            })
            .sort('time')
            .exec(function(err,doc){
                console.log(doc)
                if (err) return console.log(err)

                res.render('category',{
                    title : doc.title,
                    data : doc
                })
            })

    })


//    post请求路由

    app.post('/reg',function(req,res){
        var data = {
            username : req.body.username,
            password : req.body.password
        }

        UserModel.count({username : data.username},function(err,doc){

            if (err){
                return console.log(err)
            }
            if(doc > 0) {
                return res.send({status:0,msg:'用户名已经注册过了'})
            }

            var md5 = require('crypto').createHash('md5')
                data.password = md5.update(data.password).digest('hex')
            var entity = new UserModel(data)

            entity.save(function(err){
                if (err){
                    res.send({status:0,msg:'注册失败了'})
                    return console.log(err)
                }
                res.send({status:1,msg:'注册成功！'})
            })

        })

    })

    app.post('/login',function(req,res){

        var data = {
            username : req.body.username,
            password : req.body.password
        }
       // console.log(req.session)
        UserModel.findOne({username : data.username},function(err,doc){
            console.log(err,doc)
            if (err){
                return console.log(err)
            }
            if(err === null && doc === null) {
                res.send({status:0,msg:'用户名不存在！'})
            }

            if(doc) {
                console.log(doc)

                var md5 = require('crypto').createHash('md5')
                data.password = md5.update(data.password).digest('hex')
                if(data.password === doc.password ) {
                    //req.session.user = data.username
                    res.send({status:1,msg:'登陆成功！'})
                }
                res.send({status:0,msg:'密码错误！'})
             }
        })

    })




    app.post('/add',function(req,res){

        var data = {
            title : req.body.title,
            url : req.body.url,
            cate_name : req.body.cate_name,
            cate_id : req.body.cate_id,
            desc :req.body.desc,
            time : Date.now()
        }
        var entity = new WebModel(data)

        entity.save(function(err,doc){
            console.log(doc)
            if (err){
                res.send({status:0,msg:'添加失败'})
                return console.log(err)
            }

            CateMode.update({_id : data.cate_id},{$push:{list:doc}},function (err) {
                if (err){
                    return console.log(err)
                }
                res.send({status:1,msg:'添加成功'})
            })

        })

    })

    app.post('/addCate',function(req,res){
        var data = {
            title : req.body.title,
            time : Date.now()
        }
        var entity = new CateMode(data)
        entity.save(function(err,re){
        if (err) return console.log(err)
            console.log(re,'保存分类成功');
            //res.redirect('/addCate')
            res.send({status:1,msg:'保存成功'})
        })

    })

}
