const express = require('express');
const route = express.Router();
const productscontroller = require('../../controllers/backend/products.controller')

module.exports = app => {
    route.post('/add', productscontroller.create);
    route.post('/view', productscontroller.view);
    route.delete('/delete/:id', productscontroller.delete);
    route.put('/update/:id', productscontroller.update);



    app.use('/api/backend/products/', route);

}
