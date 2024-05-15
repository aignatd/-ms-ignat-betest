const { default: mongoose } = require("mongoose");
const dbConfig = require("../config/dbcon");

module.exports = {
  mongoose,
  url: dbConfig.url,
  user: require("./usermodel")(mongoose)
}