const mongoose = require('mongoose');

const categoryschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please select name"],
        // minLength: [2, 'must be minimun 2 characters'],
        // maxLength: 10
        // match: /^[a-zA_Z ']{2,10}$/
        // enum: ['man', 'woman']
    },
    slug: {
        type: String,
        required: true,
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

const Category = mongoose.model('Category', categoryschema);

module.exports = Category;