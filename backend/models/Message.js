const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  room: String,
  sender: String,
  message: String,
  time: String,

  fileUrl: String,
  fileType: String,
  fileName: String
});

module.exports = mongoose.model("Message", MessageSchema);