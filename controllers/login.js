const Auth = require("../models/userClass");
const bcrypt = require("bcrypt");
const authservices = require("../services/auth");

let authcontroller = {};

authcontroller.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let data = await authservices.findOne(email);
    if (!data) {
      res.json({
        success: false,
        msg: "Invalid email or password",
      });
    }
    let passCheck = await authservices.compare(password, data.password);
    if (!passCheck) {
      res.json({
        success: false,
        msg: "Invalid email or password",
      });
    }
    res.json({ success: true, msg: "Login successful", email: email });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      err: error,
    });
  }
};
authcontroller.postSignup = async (req, res, next) => {
  try {
    const { name, email, password, type } = req.body;
    const date = Date.now();
    let hashedPass = await authservices.hash(password, 12);
    let insertJson = {};
    insertJson["email"] = email;
    insertJson["password"] = hashedPass;
    insertJson["name"] = name;
    insertJson["type"] = type;
    let info = new Auth(insertJson);
    let resp = await authservices.save(info);

    res.json({ success: true, msg: "Signup successful" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      err: error,
    });
  }
};
module.exports = authcontroller;
