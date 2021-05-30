const MainRouter = require('express').Router();

MainRouter.use('/images', require('./components/images/routes.js'));

module.exports = MainRouter;