var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.ObjectId
var WebSchema = new mongoose.Schema({
	title :{type : String, require   :true},
	url : {type : String, require  :true},
	desc : {type : String, require  :true},
//    cate_name : {type : String, require  :true},
    cate_id : {type: ObjectId,require :true},
    user_id : {type: ObjectId,require:true },
	time : {type: Date, default: Date.now()}
})



var WebModel = mongoose.model('websites',WebSchema)


module.exports = WebModel