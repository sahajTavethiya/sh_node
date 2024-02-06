const JWT = require('jsonwebtoken');
const { responseMessageCode } = require('./constants');
const logger = require('./logger');
// const nodemailer = require('nodemailer');
// const request = require('request');
// const Nexmo = require('nexmo')
// const got = require('got');

// const nexmo = new Nexmo({
//     apiKey: "c4ebb8c6",
//     apiSecret: "CiVLM9boPvVQGpLH"
// })
const generateJWTokenForDA = (payload) => {
    try {
        const secret = process.env.JWT_SECRET_DA
        const signOptions = {
            issuer: 'tracking',
            expiresIn: '30d'
        };
        payload.creationDateTime = Date.now();
        const token = JWT.sign(payload, secret, signOptions);
        return (token);
    } catch (error) {
        return (error);
    }
};
const validateAccessTokenForDA = (token) => {
    return new Promise((resolve, reject) => {
        const secret = process.env.JWT_SECRET_DA

        const verifyOptions = {
            issuer: 'tracking',
            expiresIn: '30d'
        };
        JWT.verify(token, secret, verifyOptions, (err, decoded) => {
            if (err) {
                // console.log("OK1")
                logger.error(err.toString());
                // console.log("OK2")

                resolve({code :responseMessageCode.INVALID_ACCESS_TOKEN});
            }

            resolve(decoded);
        });
    });
};
const generateJWToken = (payload) => {
    try {
        const secret = process.env.JWT_SECRET_COMPANY;
        const signOptions = {
            issuer: 'tracking',
            expiresIn: '30d'
        };
        payload.creationDateTime = Date.now();
        const token = JWT.sign(payload, secret, signOptions);
        return (token);
    } catch (error) {
        return (error);
    }
};

const validateAccessToken = (token) => {
    return new Promise((resolve, reject) => {
        const secret = process.env.JWT_SECRET_COMPANY;

        const verifyOptions = {
            issuer: 'tracking',
            expiresIn: '30d'
        };
        JWT.verify(token, secret, verifyOptions, (err, decoded) => {
            if (err) {
                // console.log("OK1")
                logger.error(err.toString());
                // console.log("OK2")

                resolve({code :responseMessageCode.INVALID_ACCESS_TOKEN});
            }
            console.log("its decode",decoded);
            resolve(decoded);
        });
    });
};



const validateUser = (opts) => {
    return new Promise((resolve, reject) => {
        const user = opts.user;
        if (!user) {
            reject(responseMessageCode.NO_DATA_FOUND);
        }
        resolve(200);
    });
};

const generatepassword = () => {
    var generator = require('generate-password');
    var password = generator.generate({
        length: 10,
        numbers: true
    })
    return password
}

// const generateOTP = () => {
//     return Math.floor(1000 + Math.random() * 9000);

// };



// function sendOtpNexmo(otpDetails) {
//     const TwoFactor = new (require('2factor'))('b6d71c4f-58b1-11eb-8153-0200cd936042') //3795902e-2c0c-11eb-83d4-0200cd936042
//     TwoFactor.sendOTP(otpDetails.to, { otp: otpDetails.text }).then((sessionId) => {
//         console.log("Message sent successfully.", sessionId)
//     }, (error) => {
//         console.log('Message failed with error:' + error)
//     })
//     // const TwoFactor = new (require('2factor'))('b6d71c4f-58b1-11eb-8153-0200cd936042') //3795902e-2c0c-11eb-83d4-0200cd936042
//     // TwoFactor.sendOTP("8150951352", { otp: "123456" }).then((sessionId) => {
//     //     console.log("Message sent successfully.", sessionId)
//     // }, (error) => {
//     //     console.log('Message failed with error:' + error)
//     // })
// }
// function sendIntlOtpNexmo(otpDetails) {
//     var apiUrl = "https://2factor.in/API/V1/";
//     var keyString = "b6d71c4f-58b1-11eb-8153-0200cd936042";
//     var apiEndpoint = "/SMS/";
//     var mobileNumber = otpDetails.to;
//     var countryCode = otpDetails.countryCode;
//     got(apiUrl + keyString + apiEndpoint + countryCode + mobileNumber + "/" + otpDetails.text).then(response => {
//         console.log("Message sent successfully.", response)
//     }).catch(error => {
//         console.log(error.response.body);
//     });


// }

// function sendEmailNodemailer(mailOptions) {
//     let user = "password@askpinkypromise.com";
//     let pass = "SEyGRXvIxIGb";
//     var transporter = nodemailer.createTransport('smtps://' + user + ':' + pass + '@smtp.zoho.com');

//     transporter.sendMail(mailOptions, function (error, response) {
//         if (error) {
//             console.log({
//                 success: 0,
//                 msg: 'email error',
//                 data: error.message
//             });
//         } else {
//             console.log({
//                 success: 1,
//                 msg: 'mail send successfully',
//                 data: response
//             });
//         }
//     });
// }

module.exports = {
    generateJWTokenForDA,
    validateAccessTokenForDA,
    generateJWToken,
    validateAccessToken,
    validateUser,
    generatepassword
};
