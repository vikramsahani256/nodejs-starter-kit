
process.env.NODE_CONFIG_DIR       = 'config/';
config                            = require('config');
const app                         = require('express')();
global.app                        = app;

require('dotenv').config();

require('./middlewares');
require('./modules');
require('./services/startupService').initializeServer();
