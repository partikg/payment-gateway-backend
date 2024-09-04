const mongoose = require('mongoose');

const coursesschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "course name is required"],
        match: /^[a-zA_Z ']{2,20}$/
    },
    image: {
        type: String,
        // required: [true, "course image is required"],
    },
    price: {
        type: Number,
        required: [true, "course price is required"],
    },
    duration: {
        type: String,
        required: [true, "course duration is required"],
    },
    description: {
        type: String,
        required: [true, "course description is required"],
    },
    status: {
        type: Boolean,
        required: [true, "course status is required"],
    },
    order: {
        type: Number,
        required: [true, "course order is required"],
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    deleted_at: {
        type: Date,
        default: ''
    },
})

const coursesmodel = mongoose.model('courses', coursesschema);

module.exports = coursesmodel;