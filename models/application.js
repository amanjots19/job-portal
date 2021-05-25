const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  email: {
    type: String,
  },
  applicantId: {
    type: String,
  },
  description: {
      type : String,
  },
  recruiterEmail: {
    type: String,
  },
  status: {
    type: String,
    default: "Applied",
  },
  recruiterName: {
    type: String,
  },
  dateOfApplication: {
    type: Date,
    default: new Date(),
  },
});

module.exports = Application = mongoose.model("Application", applicationSchema);
