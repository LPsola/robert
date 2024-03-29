require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const cors         = require('cors');
const express      = require('express');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

const session    = require("express-session");
const MongoStore = require('connect-mongo')(session);


mongoose
  .connect('mongodb://localhost/robert', {useNewUrlParser: true, useUnifiedTopology:true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// default value for title local
app.locals.title = 'Robert';

// Enable authentication using session + passport
app.use(session({
  secret: 'robert',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}))

require('./passport')(app);

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');
const giverRoutes = require('./routes/giver');
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/giver', giverRoutes);

const receiverRoutes = require('./routes/receiver');
app.use('/api/receiver', receiverRoutes);

module.exports = app;
