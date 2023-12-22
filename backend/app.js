const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const expressListRoutes = require('express-list-routes');
const passport = require('passport');
const Datastore = require('nedb');
const flash = require('connect-flash');
const path = require('path');
const methodOverride = require('method-override');

const app = express();

require('dotenv').config();


app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: '23ddc5edb17e6c703bff2c1b4bd28b2ec2683f3272595b7fe858dc7ab10cbc38',
  resave: false,
  saveUninitialized: false,
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'));



// Import routes
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const Routes = require('./routes/routes');
const contactRoutes = require('./routes/contactRoutes');
const Opportunity = require('./routes/opportunity');


// Route for /about
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'about.html'));
});

// Use routes
app.use('/students', studentRoutes);
app.use('/admin', adminRoutes);
app.use('/mentors', mentorRoutes);
app.use('/contact', contactRoutes);
app.use('/opportunities', Opportunity);
app.use('/user', Routes);

//use express list routes
expressListRoutes(app);

app._router.stack.forEach(function(middleware){
  if(middleware.route){ // routes registered directly on the app
      console.log(middleware.route);
  } else if(middleware.name === 'router'){ // router middleware 
      middleware.handle.stack.forEach(function(handler){
          var route = handler.route;
          if (route) {
              console.log(route);
          }
      });
  }
});



// app.use((req, res, next) => {
//   console.log('URL:', req.url);
//   next();
//  });
 

const dbPath = path.join(__dirname, 'db');
const db = {
  students: new Datastore({ filename: path.join(dbPath, 'students.db') }),
  admins: new Datastore({ filename: path.join(dbPath, 'admins.db') }),
  mentors: new Datastore({ filename: path.join(dbPath, 'mentors.db') }),
  users: new Datastore({ filename: path.join(dbPath, 'users.db') }),
  opportunities: new Datastore({ filename: path.join(dbPath, 'opportunities.db') }),
};
app.locals.db = db;

app.get('/', (req, res) => {
  res.render('home');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
