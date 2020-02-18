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

var data = [new dataHolder(1,1,2),new dataHolder(2,2,3)];

app.get("/", (req, res, next) =>{
  res.render("home", {data: JSON.stringify(data) });
});

app.post("/creditcardinfo", (req,res,next) =>{
	console.log("data acquired");
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

module.exports = app;
