const express = require('express');
const app = express();
const exhbs = require('express-handlebars');
const mongoose = require('mongoose')
var path = require('path');
var  logger = require('morgan');
app.use(express.json());


var port = process.env.PORT || '8080'

//router file location
var homeRouter = require('./routes/home');
var testerRouter = require('./routes/test');
var batRouter = require('./routes/bat');
var articleRouter = require('./routes/article')

//setting up the templating engine
app.engine('.hbs', exhbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//setting up the mongoDB connection
mongoose.connect('mongodb://localhost/blog', { useUnifiedTopology: true, useNewUrlParser:true });

//db connection test 
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
    console.log('Database: Connection succesful')
}) 

app.use(express.urlencoded({extended:false}))

//Enabling logger in dev
app.use(logger('dev'));

//Creating a static folder for css, js and test
app.use(express.static(path.join(__dirname, 'static'))) 

app.use(function(req, res, next) { // do i need this? from a weird test guide thingy
    res.locals.showTests = req.query.test === 'show';
    next();
})

//connection the router to the path
app.use('/', homeRouter);
app.use('/test', testerRouter);
app.use('/bat', batRouter);
app.use('/article', articleRouter)



app.listen(port, () => {
    console.log('Server is starting at port', port);
})

module.exports = app;