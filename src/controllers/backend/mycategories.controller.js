const categorymodel = require("../../models/mycategory");
var slugify = require('slugify')


exports.create = async (request, response) => {

    let slug = slugify(request.body.name, {
        lower: true,      // convert to lower case, defaults to `false`
        strict: true,     // strip special characters except replacement, defaults to `false`
    })

    let category = await categorymodel.findOne({ slug });
    let counter = 1;

    while (category) {
        slug = `${slugify(request.body.name, { lower: true, strict: true })}-${counter}`;
        category = await categorymodel.findOne({ slug });
        counter++;
    }


    data = new categorymodel({
        name: request.body.name,
        slug: slug,
        image: request.body.image,
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
        // const categorydata = await categorymodel.find();
        // const categorydata = await categorymodel.find().select('name image status order');
        // const categorydata = await categorymodel.find({
        //     name: request.body.name,
        //     status: 1
        // }
        // );
        // const categorydata = await categorymodel.findOne();
        // const categorydata = await categorymodel.findById('66914a5d0b52aa223263035f');
        // const categorydata = await categorymodel.find().limit(4).skip(1).sort({ order: 'desc' });

        // const categorydata = await categorymodel.find({
        //     deleted_at: null
        //     // order: {
        //     //     $gt: 2
        //     // }
        // });



        // const condition = {
        //     deleted_at: null,
        // }

        // if (request.body.status != '') {
        //     condition.status = request.body.status;
        // }

        // if (request.body.name != '') {
        //     // condition.name = request.body.name;
        //     // condition.name = new RegExp("^" + request.body.name);
        //     condition.name = new RegExp(request.body.name, "i");
        // }


        // const condition = [{
        //     deleted_at: null,
        // }]

        // if (request.body.status != '') {
        //     condition.push({ status: request.body.status })
        // }

        // if (request.body.name != '') {
        //     filterName = new RegExp(request.body.name, "i");
        //     condition.push({ name: filterName });
        // }

        // const categorydata = await categorymodel.find({
        //     // $or: [{
        //     //     name: 'raj'
        //     // }, {
        //     //     name: 'akash'
        //     // }]

        //     $or: condition
        // });

        // if (condition.length > 0) {
        //     filter = {
        //         $or: condition
        //     }
        // } else {
        //     filter = {}
        // }

        // const categorydata = await categorymodel.find(filter);




        const addcondition = [{
            deleted_at: null,
        }];

        const orcondition = [];

        if (request.body.order != undefined) {
            if (request.body.order != '') {
                orcondition.push({ order: request.body.order })
            }
        }

        if (request.body.name != undefined) {
            if (request.body.name != '') {
                orcondition.push({ name: request.body.name })
            }
        }

        if (addcondition.length > 0) {
            var filter = { $and: addcondition }
        } else {
            var filter = {}
        }

        if (orcondition.length > 0) {
            filter.$or = orcondition;
        }

        console.log(filter);

        // const categorydata = await categorymodel.find(filter);

        const categorydata = await categorymodel.find
            (
                {
                    name: { $exists: true },
                    order: { $type: 16 },
                    deleted_at: null,
                }
            );



        if (categorydata.length != 0) {
            var resp = {
                status: true,
                message: 'record found successfully',
                data: categorydata
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

        // const categorydata = await categorymodel.deleteOne({
        //     _id: request.query.id
        // });

        // const categorydata = await categorymodel.deleteOne({
        //     _id: request.body.id
        // });

        // const categorydata = await categorymodel.deleteOne({
        //     _id: request.params.id
        // });

        // const categorydata = await categorymodel.findByIdAndDelete(request.params.id);

        const categorydata = await categorymodel.updateOne({
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

        // const categorydata = await categorymodel.deleteOne({
        //     _id: request.query.id
        // });

        // const categorydata = await categorymodel.deleteOne({
        //     _id: request.body.id
        // });

        // const categorydata = await categorymodel.deleteOne({
        //     _id: request.params.id
        // });

        // const categorydata = await categorymodel.findByIdAndDelete(request.params.id);

        const categorydata = await categorymodel.updateOne({
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