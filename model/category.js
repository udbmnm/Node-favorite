var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.ObjectId
var CateSchema = new mongoose.Schema({
    title : {type : String, require :true},
    time : {type: Date, default: Date.now()},
    list : [{type:ObjectId,ref:'websites'}]
})

CateSchema.statics.findCate = function (id,cb) {
    this.findOne({id:id}, function (err,doc) {
        if(err) return console.log(err)
        cb(doc)
    })
}

var CateModel = mongoose.model('category',CateSchema)


module.exports = CateModel