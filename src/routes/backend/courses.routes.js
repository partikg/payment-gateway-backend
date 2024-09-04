const express = require('express');
const route = express.Router();
const coursescontroller = require('../../controllers/backend/courses.controller')
const multer = require('multer')
const path = require('path');
const uploads = multer({ dest: 'uploads/courses' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/courses')
    },
    filename: function (req, file, cb) {
        // console.log(path.extname(file.originalname));
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.fieldname + '-' + uniqueSuffix)
        cb(null, 'course-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage }).single('image')


module.exports = app => {
    // route.post('/add', upload.none(), coursescontroller.create);

    route.post('/add', upload, coursescontroller.create);

    // const cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 8 }])

    // route.post('/add', cpUpload, coursescontroller.create);

    route.post('/view', uploads.none(), coursescontroller.view);

    route.post('/details/:id', uploads.none(), coursescontroller.details);

    route.put('/update/:id', upload, coursescontroller.update);

    route.put('/change-status', uploads.none(), coursescontroller.changestatus);

    route.put('/delete', uploads.none(), coursescontroller.delete);

    route.put('/multiple-delete', uploads.none(), coursescontroller.multipledelete);

    app.use('/api/backend/courses/', route);

}
