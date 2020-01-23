const express = require("express");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Pitanja = require("../models/pitanja");
const monguse = require("mongoose");
const urlParser = require("body-parser");

router.use(urlParser.urlencoded({
  extended: true
}));


monguse.connect(
  config.get("Customer.dbConfig").dbAddress,
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log("Error connect to database " + err);
    } else {
      console.log("Connected to mongodb");
    }
  }
);

router.get('/', (req, res) => {
  res.render('index');
});


router.get('/dodaj', (req, res) => {
  res.render('dodaj');
});

router.get('/oautoru', (req, res) => {
  res.render('oautoru');
});



//PITANJA-------------------------------------------------------------------------------------------------------------

//Vrati podatke 
router.get("/pitanja", (req, res) => {
  Pitanja.find()
    .exec(function (err, question) {
      if (err) {
        console.log(err);
      } else {
        var pitanja = JSON.stringify(question);
        res.render('test', { pitanja: pitanja });
      }
    });
});//radi



router.get("/svapitanja2", (req, res) => {
  Pitanja.find()
    .exec(function (err, question) {
      if (err) {
        console.log(err);
      } else {
        var pitanja = JSON.stringify(question);
        for (i = 0; i < question.length; i++) {
          res.write('<html><head><link rel="stylesheet" href="/fontawesome/css/all.min.css" /><link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css" /></head><body>'+
          '<a class="nav-link active" href="/api/"> <i class="fas fa-chevron-left"></i> Vrati se nazad</a><div><form>'   +[i+1]+') '+ question[i].pitanje + 
                          '<button type="button" class="btn btn-primary"><a href="/api/svapitanjaD/'
                          + question[i]._id +'""><i style="color:white;" class="fas fa-trash-alt">  Izbrisi</a></button></i></form></div>  </body></html>');
        
        }
      }
    });
});




router.get('/pitanja/:questionId', (req, res) => {
  let questionId = req.params.questionId;
  Pitanja.findById(questionId, function (err, myquestions) {
    if (err) {
      console.log(err);
    } else {
      console.log(myquestions);
      res.status(200).send(myquestions);
    }
  });
});//radi


router.put("/pitanja/:id", (req, res) => {
  let pitanjeID = req.params.id;
  console.log(pitanjeID);
  Pitanja.findByIdAndUpdate(
    pitanjeID,
    req.body,
    { upsert: true, useFindAndModify: false },
    (err, response) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send({ message: "Updated!" });
      }
    }
  );
});//radi


router.post('/pitanja', (req, res) => {
  let pitanjeData = req.body;
  let pitanje = new Pitanja(pitanjeData);
  pitanje.save((err, pitanje) => {
    if (err) {
      console.log(err);
    } else {
      console.log(pitanje);
      res.status(200).write("<div style='border:solid green 2px;width:50%;height:10%;color:green'><h2 style='margin:auto'>Pitanje uspesno sacuvano</h2></div>");
    }
  });
});//radi


router.get("/svapitanjaD/:id", (req, res) => {
  let questionIdForDelete = req.params.id;
  console.log(questionIdForDelete);
  Pitanja.findByIdAndDelete(questionIdForDelete, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).write('<div style="width:300px;height:40px;border:solid green 2px; color:green;">Question deleted</div>');
    }
  });
});


module.exports = router;
