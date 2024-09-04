const express = require('express');
const route = express.Router();
const cateorycontroller = require('../../controllers/backend/mycategories.controller')

module.exports = app => {
    route.post('/add', cateorycontroller.create);
    route.post('/view', cateorycontroller.view);
    route.delete('/delete/:id', cateorycontroller.delete);
    route.put('/update/:id', cateorycontroller.update);



    app.use('/api/backend/categories/', route);

}
