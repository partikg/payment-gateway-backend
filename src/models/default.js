const mongoose = require('mongoose');

const defaultschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please select name"],
        match: /^[a-zA_Z ']{2,10}$/
    },
    image: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 1,
        min: 1,
        max: 20
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

const defaultmodel = mongoose.model('course', defaultschema);

module.exports = defaultmodel;