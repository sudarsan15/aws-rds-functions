var express = require('express');
var router = express.Router();

require('./shared/shared');

var index = require('./routes/index');
var table = require('./routes/table');
var crud = require('./routes/crud');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('trust proxy', 1) // trust first proxy 
app.use(session({
  secret  : '5FQ9HYyhE9ann6J49sEjKAWdAT8B4qtJQrryHRrH',
  expires : new Date(Date.now() + 3600000),
  resave  : false,
  saveUninitialized : true,
}));

app.use(flash());

//To disable x-powered-by details in header
app.disable('x-powered-by');
app.use(helmet());
app.use(helmet.noCache());
app.use(helmet.frameguard());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use(csrf());
app.use('/table', table);
app.use('/crud', crud);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
