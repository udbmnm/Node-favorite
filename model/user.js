/**
 * Created by zhengkai on 2014/7/14.
 */
var mongoose = require('mongoose')
var UserSchema = new mongoose.Schema({
    name :{type : String, require   :true},
    password : {type : String, require  :true},
    time : {type: Date, default: Date.now()}
})



var UserModel = mongoose.model('user',UserSchema)


module.exports = UserModel