const coursesmodel = require("../../models/courses");


exports.create = async (request, response) => {

    // console.log(request.body);
    // console.log(request.files);

    if (request.body.status == '') {
        request.body.status = 1;
    }
    if (request.body.order == '') {
        request.body.order = 1;
    }

    console.log(request.file);

    data = new coursesmodel({
        name: request.body.name,
        price: request.body.price,
        duration: request.body.duration,
        description: request.body.description,
        status: request.body.status,
        order: request.body.order,
    });

    if (request.file != undefined) {
        if (request.file.filename != '') {
            data.image = request.file.filename;
        }
    }
    if (request.file != undefined) {
        if (request.file != '') {
            data.image = request.file.filename
        }
    }

    await data.save(data).then((result) => {
        const res = {
            status: true,
            message: "record created successfully",
            result: result
        }
        response.send(res);
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
    })

}



exports.view = async (request, response) => {

    var condition = {
        deleted_at: null,
    }

    if (request.body.name != undefined) {
        if (request.body.name != '') {
            condition.name = new RegExp(request.body.name, 'i');
        }
    }

    if (request.body.price != undefined) {
        if (request.body.price != '') {
            condition.price = request.body.price;
        }
    }

    if (request.body.duration != undefined) {
        if (request.body.duration != '') {
            condition.duration = new RegExp(request.body.duration, 'i');
        }
    }

    if (request.body.status != undefined) {
        if (request.body.status != '') {
            condition.status = request.body.status;
        }
    }

    // const totalrecords = await coursesmodel.find(condition).countDocuments();

    // const totalpricesum = await coursesmodel.aggregate(
    //     [{
    //         $group: {
    //             _id: null,
    //             totalsum: {
    //                 $sum: '$price'
    //             }
    //         }
    //     }]
    // );

    // const avgprice = await coursesmodel.aggregate(
    //     [{
    //         $group: {
    //             _id: null,
    //             totalavg: {
    //                 $avg: '$price'
    //             }
    //         }
    //     }]
    // );

    // const minprice = await coursesmodel.aggregate(
    //     [{
    //         $group: {
    //             _id: null,
    //             totalmin: {
    //                 $min: '$price'
    //             }
    //         }
    //     }]
    // );

    // const maxprice = await coursesmodel.aggregate(
    //     [{
    //         $group: {
    //             _id: null,
    //             totalmax: {
    //                 $max: '$price'
    //             }
    //         }
    //     }]
    // );

    const totalcalculation = await coursesmodel.aggregate(
        [{
            $group: {
                _id: null,
                count: {
                    $sum: 1
                },
                totalprice: {
                    $sum: '$price'
                },
                avgprice: {
                    $avg: '$price'
                },
                minprice: {
                    $min: '$price'
                },
                maxprice: {
                    $max: '$price'
                }
            }
        }]
    );

    await coursesmodel.find(condition)
        .sort({ order: 'asc' }, { _id: 'desc' })
        .limit(10)
        .then((result) => {
            if (result.length > 0) {
                const res = {
                    status: true,
                    message: "record found successfully",
                    imagePath: 'http://localhost:1000/uploads/courses/',
                    // totalrecords: totalrecords,
                    // totalpricesum: totalpricesum,
                    // avgprice: avgprice,
                    // minprice: minprice,
                    // maxprice: maxprice,
                    totalcalculation: totalcalculation,
                    data: result
                }
                response.send(res);
            } else {
                const res = {
                    status: false,
                    message: "no record found",
                    data: ''
                }
                response.send(res);
            }
        })
        .catch((error) => {
            const res = {
                status: false,
                message: "something went wrong",

            }
            response.send(res);
        })
}



exports.details = async (request, response) => {

    await coursesmodel.findById(request.params.id)
        .then((result) => {
            const res = {
                status: true,
                message: "record found successfully",
                data: result
            }
            response.send(res);
        })
        .catch((error) => {
            const res = {
                status: false,
                message: "something went wrong",

            }
            response.send(res);
        })
}



exports.update = async (request, response) => {
    if (request.body.status == '') {
        request.body.status = 1;
    }
    if (request.body.order == '') {
        request.body.order = 1;
    }

    data = {
        name: request.body.name,
        price: request.body.price,
        duration: request.body.duration,
        description: request.body.description,
        status: request.body.status,
        order: request.body.order,
    };

    if (request.file != undefined) {
        if (request.file.filename != '') {
            data.image = request.file.filename;
        }
    }

    if (request.file != undefined) {
        if (request.file != '') {
            data.image = request.file.filename
        }
    }

    await coursesmodel.updateOne({
        _id: request.params.id
    }, {
        $set: data
    })

        .then((result) => {
            const res = {
                status: true,
                message: "record updated successfully",
                result: result
            }
            response.send(res);
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
        })
}



exports.changestatus = async (request, response) => {



    await coursesmodel.updateOne(
        {
            _id: request.body.id
        },
        {
            $set: {
                status: request.body.status
            }
        })

        .then((result) => {
            const res = {
                status: true,
                message: "status changed successfully",
            }
            response.send(res);
        }).catch((error) => {

            const res = {
                status: false,
                message: "something went wrong",
            }
            response.send(res);
        })
}



exports.delete = async (request, response) => {

    const course = await coursesmodel.findOne({
        _id: request.body.id,
        deleted_at: null
    });

    if (course == null) {
        const result = {
            status: false,
            message: "id does not exist in database",
        }
        response.send(result);
    }



    await coursesmodel.updateOne(
        {
            _id: request.body.id
        },
        {
            $set: {
                deleted_at: Date.now()
            }
        })

        .then((result) => {
            const res = {
                status: true,
                message: "record deleted successfully",
            }
            response.send(res);
        }).catch((error) => {

            const result = {
                status: false,
                message: "something went wrong",
            }
            response.send(result);
        })
}


exports.multipledelete = async (request, response) => {



    await coursesmodel.updateMany(
        {
            _id: { $in: request.body.ids }
        },
        {
            $set: {
                deleted_at: Date.now()
            }
        })

        .then((result) => {
            const res = {
                status: true,
                message: "record deleted successfully",
            }
            response.send(res);
        }).catch((error) => {

            const result = {
                status: false,
                message: "something went wrong",
            }
            response.send(result);
        })
}

