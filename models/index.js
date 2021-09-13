const Psychotics = require('./Psychotics');
const Pets = require('./Pets');
// const Appointment = require('./Appointment');
// const Description = require('./Description');

module.exports = { Psychotics, Pets };

// create associations 
Psychotics.hasMany(Pets, {
  foreignKey: 'owner_id'
});

Pets.belongsTo(Psychotics, {
  foreignKey: 'owner_id',
});



// Psychotics.belongsToMany(Pets, {
//   through: Appointment,
//   as: 'Pet_Appointment',
//   foreignKey: 'owner_id'
// });

// Pet.belongsToMany(Owner, {
//   through: Appointment,
//   as: 'Pet_Appointment',
//   foreignKey: 'pet_id'
// });

// Appointment.belongsTo(Owner, {
//   foreignKey: 'owner_id'
// });

// Appointment.belongsTo(Pet, {
//   foreignKey: 'pet_id'
// });

// Owner.hasMany(Appointment, {
//   foreignKey: 'owner_id'
// });

// Pet.hasMany(Appointment, {
//   foreignKey: 'pet_id'
// });

// Description.belongsTo(Owner, {
//   foreignKey: 'owner_id'
// });

// Description.belongsTo(Pet, {
//   foreignKey: 'pet_id'
// });

// Owner.hasMany(Description, {
//   foreignKey: 'id'
// });

// Pet.hasMany(Description, {
//   foreignKey: 'pet_id'
// });

module.exports = { Psychotics, Pets};