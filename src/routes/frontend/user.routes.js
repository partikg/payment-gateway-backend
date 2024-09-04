const express = require('express');
const route = express.Router();
const usercontroller = require('../../controllers/frontend/user.controller');

module.exports = app => {

    route.post('/send-mail', usercontroller.sendmail);

    route.post('/register', usercontroller.register);

    route.post('/login', usercontroller.login);

    route.post('/profile', usercontroller.profile);

    app.use('/api/frontend/user', route);
}
