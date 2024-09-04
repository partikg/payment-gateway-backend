const ordermodel = require('../../models/order');
const Razorpay = require('razorpay');
// still cant resolve razorpay error

const instance = new Razorpay({
    key_id: 'rzp_test_7xIni0RPTlUpmY',
    key_secret: 'Q8wxUl6gUCWmHjPbz0Ip17Co',
});

exports.placeorder = async (request, response) => {
    // we modified code because it is giving error in razorpay
    try {
        const data = new ordermodel({
            user_id: request.body.user_id,
            product_details: request.body.product_details,
            order_total: request.body.order_total,
            shipping_details: request.body.shipping_details,
            status: 1
        });

        const result = await data.save();

        const options = {
            amount: result.order_total * 100,  // amount in paise
            currency: "INR",
            receipt: result._id.toString()
        };

        instance.orders.create(options, async function (err, order) {
            if (err) {
                console.error("Razorpay Order Creation Error:", err);
                return response.status(500).json({ status: false, message: "Failed to create Razorpay order" });
            }

            await ordermodel.updateOne(
                { _id: result._id },
                { $set: { razorpay_order_id: order.id } }
            );

            const resp = {
                status: true,
                message: 'Order Placed successfully !!',
                data: order
            };

            response.send(resp);
        });

    } catch (error) {
        console.error("Error Placing Order:", error);
        const resp = {
            status: false,
            message: 'Something went wrong !!',
            error: error
        };

        response.status(500).send(resp);
    }
};

exports.confirmorder = async (request, response) => {
    try {
        const result = await ordermodel.updateOne(
            { razorpay_order_id: request.body.order_id },
            {
                $set: {
                    razorpay_payment_id: request.body.payment_id,
                    status: request.body.status
                }
            }
        );

        const resp = {
            status: true,
            message: 'Order Status updated successfully !!',
        };

        response.send(resp);

    } catch (error) {
        console.error("Error Confirming Order:", error);
        const resp = {
            status: false,
            message: 'Something went wrong !!',
            error: error
        };

        response.status(500).send(resp);
    }
};
