const routes = require('express').Router();

const controller = require('../controllers/contacts');

routes.get('/', controller.getContacts);
routes.get('/:id', controller.getContact);
routes.post('/', controller.addContact);
routes.put('/:id', controller.editContact);
routes.delete('/:id', controller.deleteContact);

module.exports = routes;