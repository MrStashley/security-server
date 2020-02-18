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
  }
}

var data = [];

app.get("/", (req, res, next) =>{
  res.render("home", {data: JSON.stringify(data) });
});

app.post("/creditcardinfo", (req,res,next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  console.log("req.body" + JSON.stringify(req.body));
  reqBody = JSON.parse(req.body.data);
  console.log("req.body.data" + req.body.data);
  data = new dataHolder(reqBody.lat, reqBody.long, reqBody.accuracy);
  console.log(data);
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

module.exports = app;
