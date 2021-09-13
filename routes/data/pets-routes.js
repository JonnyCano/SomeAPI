const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Pets, Psychotics } = require('../../models');


// GET /api/users
router.get('/', (req, res) => {
  console.log('======================');
  Pets.findAll({
    attributes: ['id', 'name', 'species', 'breed'],
    include: [
    //   {
    //     model: Description,
    //     attributes: ['appointment_description']
    //   }, 
      {
        model: Psychotics,
        attributes: ['psycho', 'diagnosis']
      }
    ]
  })
  .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/pet/1
router.get('/:id', (req, res) => {
  Pets.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'name', 'species', 'breed'],
    include: [
      {
        model: Psychotics,
        attributes: ['name', 'diagnosis']
      }
    ]
  })
    .then(dbPetsData => {
      if (!dbPetsData) {
        res.status(404).json({ message: 'No pet found with this owner' });
        return;
      }
      res.json(dbPetsData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
// router.post('/', (req, res) => {
//   Post.create({
//     name: req.body.name,
//     type: req.body.type,
//     breed: req.body.breed,
//     age: req.body.age,
//     owner_id: req.body.owner_id
//   })
//     .then(dbPetData => res.json(dbPetData))
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });


// PUT /api/pet/appointment
// router.put('/appointment', (req, res) => {
//   Pet.appointmentDate(req.body, { Appointment })
//   .then(updatedPetData => res.json(updatedPetData))
//   .catch(err => {
//     console.log(err);
//     res.status(400).json(err);
//   });
// });  

// PUT /api/users/1
router.put('/:id', (req, res) => {

});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {

});

module.exports = router;