const express = require('express');
const route = express.Router();
const ordercontroller = require('../../controllers/frontend/orders.controller');

module.exports = app => {

    route.post('/place-order', ordercontroller.placeorder);
    route.post('/confirm-order', ordercontroller.confirmorder);

    app.use('/api/frontend/orders', route);
}
