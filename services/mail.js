// const nodemailer = require('nodemailer')

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: //SMTP EMAILID,
//       pass: //SMPTP PASSWORD,
//     },
//   });

//   let services = {};
// services.sendMail = function (Obj) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let mail = await transporter.sendMail(
//         {
//           to: Obj.email,
//           from: Obj.from,
//           subject: Obj.subject,
//           text: Obj.text,
//           html: Obj.html,
//         },
//         (err, info) => {
//           if (err) {
//             console.log(err);
//             reject({ msg: err, code: "NOT SENT" });
//           }
//           resolve(info);
//         }
//       );
//     } catch (e) {
//       console.log(e);
//       reject({ msg: e, code: "NOT SENT" });
//     }
//   });
// };

// module.exports = services;