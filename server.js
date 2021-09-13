// import the path and fs built-in node packages to the app
// const fs = require('fs');
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
// instantiate the server:
const app = express();
// change the port variable to something that can run on ports that are hosted by other environments
// like heroku that run on 80 or 443
const PORT = process.env.PORT || 80;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//make the session private
const sess = {
    secret: 'something',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

app.use(session(sess));

// app.use('/api/psychos', require('./routes/psychopaths'));

// const { psychotics } = require('./routes/data/Psycho');

const hbs = exphbs.create({});

// Middleware: use is a method that mounts a function to the server that our requests will pass through before getting to the intended endpoint
//set theview engine to handlebars pass in the exphbs
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
//setting the view engine
app.set('view engine', 'handlebars');
// parse incoming JSON data
app.use(express.json());
// parse incoming string or array data
app.use(express.urlencoded({ extended: false }));
// Set static folder
// instruct the server to open routes to css and js
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes'))

// this function takes in the id and array of psychopaths and returns a psychopath object:
function findByPetID(id, psychopathsArray) {
    const result = psychopathsArray.filter(psychopath => psychopath.id === id)[0];
}

//turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
  });