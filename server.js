// import the path and fs built-in node packages to the app
const fs = require('fs');
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
// change the port variable to something that can run on ports that are hosted by other environments
// like heroku that run on 80 or 443
const PORT = process.env.PORT || 3001;
// instantiate the server:
const app = express();

app.use('/api/psychos', require('./routes/psychopaths'));

const { psychotics } = require('./routes/data/Psycho');

// Middleware: use is a method that mounts a function to the server that our requests will pass through before getting to the intended endpoint
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// Set static folder
// hint: move after the Homepage route to see another render of the server
// and instruct the server to open routes to css and js
app.use(express.static(path.join(__dirname, 'public')));
//set theview engine to handlebars pass in the exphbs
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
//setting the view engine
app.set('view engine', 'handlebars');

function filterByQuery(query, psychopathsArray) {
    let personalityTraitsArray = [];
    // note that we save the psychopathsArray as filteredResults here:
    let filteredResults = psychopathsArray;
    if (query.personalityTraits) {
        // save personalityTraits as a dedicated arrray.
        // If personalityTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array.
            // Remamber, it is initially a copy of the animalsArray,
            // but here we're upadating it for each trait in the .forEach loop.
            // for each trait being targeted by the filter, the filteredResults
            // array will then contain only the entries that contain the trait,
            // so at the end we'll have an array of animals that have every one
            // of the traits when the .forEach() loop is finished.
            filteredResults = filteredResults.filter(
                psychopath => psychopath.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.Level) {
        filteredResults = filteredResults.filter(psychopath => psychopath.Level === query.Level);
    }
    if (query.diagnosis) {
        filteredResults = filteredResults.filter(psychopath => psychopath.diagnosis === query.diagnosis);
    }
    if (query.psycho) {
        filteredResults = filteredResults.filter(psychopath => psychopath.psycho === query.psycho);
    }
    // return the filtered results:
    return filteredResults;
}

// this function takes in the id and array of psychopaths and returns a psychopath object:
function findByPetID(petID, psychopathsArray) {
    const result = psychopathsArray.filter(psychopath => psychopath.petID === petID)[0];
}

app.get('/', (req, res) => res.render('index', {
    title: 'Psychopaths',
    psychotics
}))

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
})