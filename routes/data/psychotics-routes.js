const router = require('express').Router();
const { Psychotics, Pets } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
  Psychotics.findAll({
    attributes: {exclude: ['password'] }
  })
    .then(dbPsychoticsData => res.json(dbPsychoticsData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
  Psychotics.findOne({
    attributes: {exclude: ['password']},
    where: {
        id: req.params.id
    },
    include: [  {
      model: Pets,
      attributes: ['id', 'name', 'species', 'breed']
    }
    // {
    //   model: Pets,
    //   attributes: ['title'],
    //   through: Appointment,
    //   as: 'Pet_appointments'
    // },
    // {
    //   model: Description,
    //   attributes: ['id', 'appointment_description']
    // }

  ]
  })
    .then(dbPsychoticsData => {
      if (!dbPsychoticsData) {
        res.status(404).json({ message: 'No owner found with this id' });
        return;
      }
      res.json(dbPsychoticsData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post('/', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  Psychotics.create({
    username: req.body.username,
    Level: req.body.email,
    password: req.body.password
  })
    .then(dbPsychoticsData => res.json(dbPsychoticsData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//POST /api/users/login
router.post('/login', (req, res) => {
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    Psychotics.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbPsychoticsData => {
      if (!dbPsychoticsData) {
        res.status(400).json({ message: 'No owners with that email address!' });
        return;
      }
      // Verify user
      const validPassword = dbPsychoticsData.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
      
      res.json({ user: dbPsychoticsData, message: 'You are now logged in!' });
    });  
  });

// PUT /api/users/1
router.put('/:id', (req, res) => {
 // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  Psychotics.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbPsychoticsData => {
      if (!dbPsychoticsData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbPsychoticsData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
  Psychotics.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPsychoticsData => {
      if (!dbPsychoticsData) {
        res.status(404).json({ message: 'No owner found with this id' });
        return;
      }
      res.json(dbPsychoticsData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;