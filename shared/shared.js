
//Part of app.js
global.path = require('path');
global.favicon = require('serve-favicon');
global.logger = require('morgan');
global.cookieParser = require('cookie-parser');
global.bodyParser = require('body-parser');
global.session = require('express-session');
global.flash = require('connect-flash');
global.csrf = require('csurf');
global.helmet = require('helmet');
global.cors = require('cors');

// Apart from app.js
global.AWS = require('aws-sdk');
global.mysql = require('mysql');
global.xss = require('xss');
global.striptags = require('striptags');
global.validator = require('validator');


//config
global.config = require('../config/config');

//require('dotenv').config();