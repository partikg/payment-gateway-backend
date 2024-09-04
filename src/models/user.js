const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        match: /^[a-zA_Z ']{2,20}$/
    },
    email: {
        type: String,
        required: [true, "email is required"],
    },
    mobile_no: {
        type: String,
        required: [true, "mobile_no is required"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    status: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 1,
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

const usermodel = mongoose.model('user', userschema);

module.exports = usermodel;