var WebModel = require('../model/websites.js')
var CateMode = require('../model/category.js')
module.exports = function(app){

	app.get('/',function(req,res){
		WebModel.find({}).sort('time').exec(function(err,doc){
			if (err) return console.log(err)
                res.render('index',{
                    title : '首页',
                    data : doc
                })


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

    app.get('/cate/:id',function(req,res){
        var id = req.params.id
        console.log('id:'+id)
        WebModel.find({cate_id:id}).sort('time').exec(function(err,doc){
            if (err) return console.log(err)
            if(doc === null) return res.send('没有查询到数据')
            res.render('category',{
                title : '分类网址列表',
                data : doc
            })
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
        console.log(data)
        var entity = new WebModel(data)
        entity.save(function(err,re){
            if (err){
                res.send({status:0,msg:'添加失败'})
                return console.log(err)
            }
            res.send({status:1,msg:'添加成功'})
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
