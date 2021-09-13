const router = require('express').Router();

const psychoticsRoutes = require('./psychotics-routes');
const petsRoutes = require('./pets-routes');
// const descriptionRoutes = require('./description-routes');

router.use('/psychotics', psychoticsRoutes);
router.use('/pets', petsRoutes);
// router.use('/description', descriptionRoutes);

module.exports = router;