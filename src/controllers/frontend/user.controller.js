const nodemailer = require("nodemailer");
const usermodel = require('../../models/user')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var secretkey = '123456';


exports.sendmail = async (request, response) => {


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        // host: "gmail",
        // port: 587,
        // secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "pratikgraut2610@gmail.com",
            pass: "iljzuoqluamyfryr",
        },
    });

    try {
        const info = await transporter.sendMail({
            from: '"Pratik 👻" <pratikgraut2610@gmail.com>', // sender address
            to: "pratikgraut2610@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        const res = {
            status: true,
            message: "record found successfully",
        }
        response.send(res);

    } catch (error) {
        const res = {
            status: false,
            message: "record found successfully",
            error: error
        }
        response.send(res);
    }



}


exports.register = async (request, response) => {

    var data = new usermodel({
        name: request.body.name,
        email: request.body.email,
        mobile_no: request.body.mobile_no,
        // password: request.body.password,
        password: bcrypt.hashSync(request.body.password, 10),
    })

    await data.save().then((result) => {

        var token = jwt.sign(
            {
                userdata: result
            },
            secretkey,
            { expiresIn: '1h' });

        var resp = {
            status: true,
            message: 'record create successfully',
            token: token,
            // result: result
        }
        response.send(resp);

    }).catch((error) => {
        var resp = {
            status: false,
            message: 'something went wrong'
        }
        console.log(error);
        response.send(resp);


    });

}



exports.login = async (request, response) => {

    await usermodel.findOne(
        {
            email: request.body.email,
        }
    ).then((result) => {

        if (result) {

            var compare = bcrypt.compareSync(request.body.password, result.password)

            if (compare) {

                var token = jwt.sign(
                    {
                        userdata: result
                    },
                    secretkey,
                    { expiresIn: '15s' });

                var resp = {
                    status: true,
                    message: 'Login successfully',
                    token: token,
                    // result: result
                }
            } else {
                var resp = {
                    status: false,
                    message: 'incorrect password',
                    result: result
                }
            }


        } else {
            var resp = {
                status: false,
                message: 'no user found',
                result: result
            }
        }

        response.send(resp);

    }).catch((error) => {
        var resp = {
            status: false,
            message: 'something went wrong'
        }
        console.log(error);
        response.send(resp);


    });

}



exports.profile = async (request, response) => {

    console.log(request.headers.authorization);

    if (request.headers.authorization == undefined) {
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

    jwt.verify(request.headers.authorization, secretkey, function (error, result) {
        if (error) {
            console.log(error)
            var res = {
                status: false,
                token_error: true,
                message: 'incorrect token '
            }
            response.send(res);
        } else {
            var res = {
                status: true,
                message: 'profile found',
                data: result
            }
            response.send(res);
        }
    });


    // var resp = {
    //     status: false,
    //     message: 'something went wrong'
    // }
    // response.send(resp);

    // await usermodel.findOne(
    //     {
    //         email: request.body.email,
    //     }
    // ).then((result) => {

    //     if (result) {

    //         var compare = bcrypt.compareSync(request.body.password, result.password)

    //         if (compare) {

    //             var token = jwt.sign(
    //                 {
    //                     userdata: result
    //                 },
    //                 secretkey,
    //                 { expiresIn: '1h' });

    //             var resp = {
    //                 status: true,
    //                 message: 'Login successfully',
    //                 token: token,
    //                 // result: result
    //             }
    //         } else {
    //             var resp = {
    //                 status: false,
    //                 message: 'incorrect password',
    //                 result: result
    //             }
    //         }


    //     } else {
    //         var resp = {
    //             status: false,
    //             message: 'no user found',
    //             result: result
    //         }
    //     }

    //     response.send(resp);

    // }).catch((error) => {
    //     var resp = {
    //         status: false,
    //         message: 'something went wrong'
    //     }
    //     console.log(error);
    //     response.send(resp);


    // });

}
