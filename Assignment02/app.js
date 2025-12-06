const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const passport = require('passport');

const keys = require('./config/keys');
require('./db/mongoose'); // connect
require('./passport/passport-config')(passport);

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

// View engine
app.engine('hbs', exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}).engine);
app.set('view engine', 'hbs');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Sessions (store in Mongo)
app.use(session({
  secret: keys.sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: keys.mongoURI,
    ttl: 14 * 24 * 60 * 60 // 14 days
  })
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(flash());

// Global template vars
app.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error'); // passport sets this
  next();
});

// Routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});



