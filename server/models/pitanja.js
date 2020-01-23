const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const pitanjaShema = new Schema({
  pitanje: String,
  odg1: String,
  odg2: String,
  odg3: String,
  tacanOdg: String
},{
  collection:'Pitanja'
});

module.exports = mongoose.model("Pitanja",pitanjaShema,"Pitanja");
