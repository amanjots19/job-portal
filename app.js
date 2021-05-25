var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
var applicationRoutes = require('./routes/application');
var authRoutes = require('./routes/auth');
var jobRoutes = require('./routes/job');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const MONGODB_URI =
'mongodb+srv://aman:amanjots11@cluster0.0vgdg.mongodb.net/Job-portal?retryWrites=true&w=majority';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/',jobRoutes)
app.use('/auth',authRoutes)
app.use('/application',applicationRoutes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });

module.exports = app;
