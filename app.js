var express  = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//connect to db
mongoose.connect('mongodb://localhost:27017/relations',{useNewUrlParser:true})
.then(()=>console.log('connected to db'))
.catch((err)=>console.log('connect error',err))

//init app
var app = express();

//fetch the data from request
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//routes
app.use('/book',require('./routes/bookroute'));

//assign port
var port = process.env.PORT || 3000;
app.listen(port,()=>console.log('server run at port '+port));