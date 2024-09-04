const coursemodel = require('../../models/courses');
var jwt = require('jsonwebtoken');

var secretkey = '123456';


exports.view = async (request, response) => {

    console.log(request.headers.authorization.split(' ')[1]);

    if (request.headers.authorization.split(' ')[1] == undefined) {

        var res = {
            status: false,
            token_error: true,
            message: 'token required'
        }
        response.send(res);

    }

    if (request.headers.authorization.split(' ')[1] == '') {

        var res = {
            status: false,
            token_error: true,
            message: 'invalid token required'
        }
        response.send(res);
    }

    jwt.verify(request.headers.authorization.split(' ')[1], secretkey, function (error, result) {
        if (error) {
            console.log(error)
            var res = {
                status: false,
                message: 'incorrect token '
            }
            response.send(res);
        } else {
            var userdetails = result;
            console.log(result)
        }
    });


    var condition = {
        deleted_at: null,
        status: 1,
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



    await coursemodel.find(condition)
        .sort({ order: 'asc' }, { _id: 'desc' })
        .then((result, userdetails) => {
            if (result.length > 0) {
                const res = {
                    status: true,
                    message: "record found successfully",
                    userdeatils: userdetails,
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
