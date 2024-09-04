const productmodel = require("../../models/product");
const Category = require("../../models/mycategory");



exports.create = async (request, response) => {

    data = new productmodel({
        name: request.body.name,
        image: request.body.image,
        category_id: request.body.category_id,
        status: request.body.status,
        order: request.body.order,
        created_at: Date.now(),
        updated_at: Date.now(),
    })

    await data.save().then((success) => {
        const result = {
            status: true,
            message: "record created successfully",
            data: success
        }
        response.send(result);
    }).catch((error) => {

        error_messages = [];

        for (let field in error.errors) {
            error_messages.push(error.errors[field].message)
        }

        const result = {
            status: false,
            message: "something went wrong",
            error_message: error_messages
        }
        response.send(result);
    });


}

exports.view = async (request, response) => {

    try {

        const addcondition = [{
            deleted_at: null,
        }];


        const productdata = await productmodel.find()
            .populate(
                {
                    path: 'category_id',
                    select: {
                        '_id': 1, 'name': 1, 'image': 1
                    },
                })
            // .populate({ path: 'categories', options: { strictPopulate: false } })
            .exec();




        if (productdata.length != 0) {
            var resp = {
                status: true,
                message: 'record found successfully',
                data: productdata
            }
            response.send(resp);
        } else {
            var resp = {
                status: false,
                message: 'no record found'
            }
            response.send(resp);
        }
    } catch (error) {
        var resp = {
            status: false,
            message: 'something went wrong'
        }
        response.send(resp);
    }

}

exports.delete = async (request, response) => {
    try {

        await productmodel.updateOne({
            _id: request.params.id
        }, {
            $set: {
                deleted_at: Date.now()
            }
        })

        var resp = {
            status: true,
            message: 'record deleted successfully',
        }

        response.send(resp);

    } catch (error) {

        var resp = {
            status: false,
            message: 'something went wrong'
        }

        response.send(resp);

    }
}

exports.update = async (request, response) => {
    try {


        await productmodel.updateOne({
            _id: request.params.id
        }, {
            $set: {
                name: request.body.name
            }
        })

        var resp = {
            status: true,
            message: 'record updated successfully',
        }

        response.send(resp);

    } catch (error) {

        var resp = {
            status: false,
            message: 'something went wrong'
        }

        response.send(resp);

    }
}