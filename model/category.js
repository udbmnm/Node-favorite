var mongoose = require('mongoose')

var CateSchema = new mongoose.Schema({
    title : String,
    time : Date
})

CateSchema.statics.findCate = function (id,cb) {
    this.findOne({id:id}, function (err,doc) {
        if(err) return console.log(err)
        cb(doc)
    })
}

var CateModel = mongoose.model('category',CateSchema)


module.exports = CateModel