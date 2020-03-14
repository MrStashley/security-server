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
    this.imgLink = __dirname + '/Images/faceImage' + id + ".jpg";
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
  data.push(new dataHolder(reqBody.lat, reqBody.long, reqBody.accuracy, data.length));
  console.log("New Data: " + data);

  res.sendStatus(200);
});

app.post("/creditcardinfoimage", (req,res,next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  console.log(JSON.stringify(req.header));
  reqBody = req.body;
  var link = __dirname + '/getfaceimage?id=' + data.length;
  console.log(link);
  fs.writeFile(link, req.body, function(err){
    if(err)
      console.log("Error: " + err);
    else
      if(data.length > 0)
        data[data.length-1].imgLink = link
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
