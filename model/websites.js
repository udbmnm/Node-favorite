var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.ObjectId
var WebSchema = new mongoose.Schema({
	title : String,
	url : String,
	desc : String,
    cate_name : String,
    cate_id : String,
	time : Date
})



var WebModel = mongoose.model('websites',WebSchema)


module.exports = WebModel