const express = require('express');
const formRouter = express.Router();
const db = require('./formQueries');

formRouter.get('/', db.getAllFormData);
formRouter.post('/', db.addFormData);

module.exports = formRouter;
