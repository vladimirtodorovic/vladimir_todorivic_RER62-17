const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");



const PORT = 3000;
const api = require("./routes/api");

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", api);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, function() {
  console.log("Server running on localhost:" + PORT);
});

/*
const MongoClient = require(‘mongodb’).MongoClient;
const uri = "mongodb+srv://evidencijamaterijala:<password>@evidencijamaterijaladb-tt4bt.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/
