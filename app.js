var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var hbs = require('express-hbs');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

// set up handlebars: use views folder, extension .hbs
app.engine('hbs', hbs.express4());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app level middleware
// / -> routes/index -> ctrlr.showIndex
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



// helper to show 5 symbols in the block, n of which marked "on"
hbs.registerHelper('fivesymbols', function (n, block) {
    return '<span class="importance"><span class="redalert">'
        +  block.fn(this).repeat(n)    // repeat() is ES6
        +  '</span>'
        +  block.fn(this).repeat(5-n)
        +  "</span>\n";
});

// helper to format a date
hbs.registerHelper('nicedate', function (block) {
    var yyyymmdd = block.fn(this);
    console.log("ymd:"+yyyymmdd);
    var theDate = new Date(yyyymmdd+"T12:00:00");
    theDate = Math.trunc(theDate.getTime()/24/60/60/1000); // days since 1070-01-01
    var today = new Date().toJSON().slice(0, 10);          // yyyy-mm-dd
    today = new Date(today+"T12:00:00");
    today = Math.trunc(today.getTime()/24/60/60/1000);
    switch (today-theDate) {
        case -1: return "tomorrow"; break;
        case 0: return '<span class="redalert">today</span>'; break;
        case 1: return "yesterday"; break;
        default: return yyyymmdd;
    }
});


module.exports = app;
