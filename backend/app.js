// Import the necessary modules.
const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Datastore = require('nedb');
const path = require('path');
const registerStudentController = require('./controllers/registerStudentController');
const studentController = require('./controllers/studentController');


// Initialize the Express app.
const app = express();

// Set up Mustache as the view engine.
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Set up the public directory to serve static files.
app.use('/public', express.static(path.join(__dirname, 'public')));

// Use body-parser middleware to parse the body of POST requests.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: '', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

require('./routes')(app, passport);

const methodOverride = require('method-override');

app.use(methodOverride('_method'));


// Import the routes.
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const loginRoutes = require('./routes/loginRoutes');
const registerStudentRoutes = require('./routes/registerStudentRoutes');



// Use the routes.
app.use('/students', studentRoutes);
app.use('/admins', adminRoutes);
app.use('/mentors', mentorRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerStudentRoutes);



// GET request to confirm the email
app.get('/confirm-email', registerStudentController.confirmEmail); // Add the route

app.delete('/students/removeOpportunity/:id', studentController.removeOpportunity);
 

const dbPath = path.join(__dirname, 'db');

const db = {};
db.students = new Datastore({ filename: path.join(dbPath, 'students.db'), });
db.admins = new Datastore({ filename: path.join(dbPath, 'admins.db'), });
db.mentors = new Datastore({ filename: path.join(dbPath, 'mentors.db'), });
db.users = new Datastore({ filename: path.join(dbPath, 'users.db'), });
db.opportunities = new Datastore({ filename: path.join(dbPath, 'opportunities.db'), });
app.locals.db = db;

app.get('/', (req, res) => {
 res.render('home');
});

// Set up the server to listen on a port.
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
