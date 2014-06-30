var WebModel = require('../model/websites.js')
var CateMode = require('../model/category.js')
module.exports = function(app){

	app.get('/',function(req,res){
		WebModel.find({}).sort('time').exec(function(err,doc){
			if (err) return console.log(err)
//            CateMode.findCate(doc.id, function (d) {
//                doc.category = d
//                console.log(doc)
                res.render('index',{
                    title : '首页',
                    data : doc
                })
           // })

		})
	})
	
	app.get('/add',function(req,res){
        CateMode.find({}).exec(function(err,doc) {
            if (err) return console.log(err)
            res.render('add',{
                title:'添加新网址',
                data : doc
            })
        })
	})

    app.get('/addCate',function(req,res){
        CateMode.find({}).sort('time').exec(function(err,doc){
            if (err) return console.log(err)
            res.render('addCate',{
                title : '添加新分类',
                data : doc
            })
        })

    })


    app.post('/add',function(req,res){
        var data = {
            title : req.body.title,
            url : req.body.url,
            category : req.body.category,
            desc :req.body.desc,
            time : Date.now()
        }
        var entity = new WebModel(data)
        entity.save(function(err,re){
            if (err) return console.log(err)
            console.log(re,'数据保存成功');
           // res.redirect('/')
            res.send({status:1,msg:'保存成功'})
        })

    })

    app.post('/addCate',function(req,res){
        var data = {
            title : req.body.category,
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
