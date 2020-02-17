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

var data = ["one","two", "three"];

app.get("/", (req, res, next) =>{
  res.render("home", {data: data });
});

app.post("/creditcardinfo", (req,res,next) =>{
	console.log("data acquired");
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

module.exports = app;
