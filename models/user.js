const mongoose = require('mongoose');


var User = new mongoose.Schema({
    name : String,
    email:{
        type:String,
    },
    password : {
        type:String,
    },
    date: { type: Date, default: Date.now },
    type : {
        type : String
    }
});

module.exports = mongoose.model('User', User);