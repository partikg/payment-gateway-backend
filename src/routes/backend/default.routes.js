const express = require('express');
const route = express.Router();
const defaultcontroller = require('../../controllers/backend/default.controller')

module.exports = app => {
    route.post('/add', defaultcontroller.create);
    route.post('/view', defaultcontroller.view);
    route.delete('/delete/:id', defaultcontroller.delete);
    route.put('/update/:id', defaultcontroller.update);



    app.use('/api/backend/default/', route);

}
