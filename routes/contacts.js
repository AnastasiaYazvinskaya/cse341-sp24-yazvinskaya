const routes = require('express').Router();

const controller = require('../controllers/contacts');

routes.get('/', controller.getContacts);
routes.get('/:id', controller.getContact);

module.exports = routes;