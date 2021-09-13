const sequelize = require('../config/connection');
const { Psychotics } = require('../models');
const router = require('express').Router();
// Homepage Route:
router.get('/', (req, res) => {
  if (!req.query.password) {
    res.render('index', { layout: 'landing'})
  } else {
    Psychotics.findOne({
      where: {
        password: req.query.password
      }
    })
    .then(psychotic => {
      console.log(psychotic)
      res.render('homepage', {
        title: psychotic.psycho.toString(),
        psycho: psychotic.psycho.toString(),
        diagnosis: psychotic.diagnosis.toString(),
        Level: psychotic.Level.toString()
      })
    })
  }
});

router.post('/', (req, res) => res.redirect("/"))

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;