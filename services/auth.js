const User = require('../models/user');
const bcrypt = require('bcrypt')

module.exports.save = function (Obj) {
    return new Promise(async (resolve, reject) => {
      try {
        var email = Obj.email;
        var password = Obj.password;
        var name = Obj.name;
        var date = Obj.date;
        var type = Obj.type;
        const data = new User({
            name: name,
            email: email,
            password: password,
            date: date,
            type:type
        });
        resp = await data.save();
        resolve(resp);
      } catch (e) {
        reject({msg : e});
      }
    });
  };
  module.exports.findOne = function(param){
      return new Promise(async (resolve,reject)=>{
          try{
            let data = await User.findOne({email : param});
            resolve(data);
          }
          catch(e){
              reject(e)
          }
      })
  }
  module.exports.compare = function(param , comparator){
    return new Promise(async (resolve,reject)=>{
        try{
            let passCheck = await bcrypt.compare(param , comparator);
            resolve(passCheck);
        }
        catch(e){
            reject(e)
        }
    })
  }
  module.exports.hash = function(password, number ){
    return new Promise(async (resolve,reject)=>{
        try{
            let passCheck = await bcrypt.hash(password , number);
            resolve(passCheck);
        }
        catch(e){
            reject(e)
        }
    })
  }