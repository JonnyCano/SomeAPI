const router = require('express').Router();
const apiRoutes = require('./data');
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
router.use('/data', apiRoutes);

module.exports = router;