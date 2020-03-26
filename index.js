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


http.listen(port, function(){
  console.log('listening on *:' + port);
});

module.exports = app;
