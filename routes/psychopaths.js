// const express = require('express');
// const psychopathsRoute = express.Router();

// const app = express();
// // Middleware: use is a method that mounts a function to the server that our requests will pass through before getting to the intended endpoint
// // parse incoming string or array data
// app.use(express.urlencoded({ extended: false }));
// // parse incoming JSON data
// app.use(express.json());

// const uuid = require('uuid');
// // const router = express.Router();
// const { psychotics } = require('./data/Psycho');

// // Get all psychotics
// psychopathsRoute.get('/', (req, res) => res.json(psychotics));

// // app.get('/', (req, res) => {
// //     // this is not ideal because we would have to declare a route for every webpage
// //     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// // });

// // Get Single Psychotic
// psychopathsRoute.get('/:petID', (req, res) => {
//     const found = psychotics.some(psycho => psycho.petID === parseInt(req.params.petID));

//     if (found) {
//         res.json(psychotics.filter(psycho => psycho.petID === parseInt(req.params.petID)));
//     } else {
//         res.status(400).json({ msg: `No psycho with the id of ${req.params.petID}` });
//     }
// });

// // Create Member
// // In most cases a post request handles input data
// psychopathsRoute.post('/', (req, res) => {
//     console.log(req.body)
//     // const newPsycho = {
//     //     psycho: req.body.psycho,
//     //     diagnosis: req.body.diagnosis,
//     //     Level: req.body.Level,
//     //     personalityTraits: req.body.personalityTraits,
//     //     petID: uuid.v4()
//     // }

//     // check if the email is sent with the request
//     // if (!newPsycho.psycho || !newPsycho.diagnosis) {
//     //     // in order to avoid an error add a return keyword otherwise the browser will look for an else
//     //     return res.status(400).json({ msg: 'Please include a name and diagnosis' });
//     // }

//     // taking the hard-coded members array and respond with the array of members which includes the new entry
//     // psycho.push(newPsycho);
//     // res.json(members);
//     // a redirect so the json doesn't render on the page
//     res.redirect('/');
// });

// // Update member
// psychopathsRoute.put('/:petID', (req, res) => {
//     const found = psycho.some(psycho => psycho.petID === parseInt(req.params.petID));

//     if (found) {
//         const updPsycho = req.body;
//         psycho.forEach(psycho => {
//             if (member.petID === parseInt(req.params.petID)) {
//                 // updadated member name else keep the old data
//                 psycho.psycho = updPsycho.psycho ? updPsycho.psycho : psycho.psycho;
//                 psycho.diagnosis = updPsycho.diagnosis ? updPsycho.diagnosis : psycho.diagnosis;

//                 res.json({ msg: 'Psycho updated', psycho });
//             }
//         });
//     } else {
//         res.status(400).json({ msg: `No psycho with id of ${req.params.petID}` });
//     }
// })

// // Delete member
// psychopathsRoute.delete('/:petID', (req, res) => {
//     const found = psycho.some(psycho => psycho.petID === parseInt(req.params.petID));

//     if (found) {
//         res.json({ msg: 'Psycho deleted', psycho: psycho.filter(psycho => psycho.petID !== parseInt(req.params.petID))});
//     } else {
//         res.status(400).json({ msg: `No psycho with the pet id of ${req.params.petID}` });
//     }
// });

// module.exports = psychopathsRoute;