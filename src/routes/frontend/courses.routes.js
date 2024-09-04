const express = require('express');
const route = express.Router();
const coursecontroller = require('../../controllers/frontend/courses.controller');

module.exports = app => {

    route.post('/view', coursecontroller.view);

    app.use('/api/frontend/courses', route);
}
