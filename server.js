var express = require('express')
var app = express()
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/asset', express.static(path.join(__dirname, 'asset')));
app.use('/bin', express.static(path.join(__dirname, 'bin')));

app.get('/', function (req,res){
	res.render('index');
})

app.listen(3000, function(){
	console.log("server is running");
})