const mongoose = require('mongoose');

const orderschema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    product_details: {
        type: Array,
        required: true,
    },
    order_total: {
        type: Number,
        required: true
    },
    razorpay_order_id: {
        type: String,
        default: null,
    },
    razorpay_payment_id: {
        type: String,
        default: null,
    },
    status: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7],
        // 0-orderplaced,1-pending
        default: 1
    },
    shipping_details: {
        type: Object,
        required: true,
    },
}, {
    timestamps: true
})

const ordermodel = mongoose.model('order', orderschema);

module.exports = ordermodel;