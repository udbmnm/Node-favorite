var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.ObjectId
var WebSchema = new mongoose.Schema({
	title : String,
	url : String,
	desc : String,
    category : String,
    cate_id : ObjectId,
	time : Date
})



var WebModel = mongoose.model('websites',WebSchema)


module.exports = WebModel