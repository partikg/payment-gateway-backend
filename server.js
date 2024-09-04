const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();

server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/uploads/courses', express.static('uploads/courses'))

server.get('/', (request, response) => {
    response.send('server working fine');
})

//Backend Routes
require('./src/routes/backend/categories.routes')(server);
require('./src/routes/backend/courses.routes')(server);
require('./src/routes/backend/products.routes')(server);

// Frontend Routes
require('./src/routes/frontend/courses.routes')(server);
require('./src/routes/frontend/user.routes')(server);
require('./src/routes/frontend/orders.routes')(server);

// server.get('/add', (request, response) => {

//     const result = {
//         status: true,
//         message: "record created successfully"
//     }

//     response.send(result);
// })

server.get('*', (request, response) => {
    response.send('page not found');
})


// need to install mongodb
mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        server.listen('1000', () => {
            console.log('database connected')
        });
    }).catch(() => {
        console.log('!!!database not connected')
    });