const mongoose = require('mongoose');
const Category = require('./mycategory');
const { Schema } = mongoose;

const productschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please select name"],
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
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

const product = mongoose.model('products', productschema);

module.exports = product;