const logger = require('./logger');
const {
    responseMessageCode,
    responseMessageFlags
} = require('./constants');
const {
    getResponseMessage
} = require('./multilingualService');

const actionCompleteResponse = (res, languageCode, data, message, successCode) => {
    if (successCode) {
        var msg = getResponseMessage(successCode, languageCode);
    }
    const response = {
        message: message || msg || getResponseMessage(
            responseMessageCode.ACTION_COMPLETE,
            languageCode
        ),
        status: responseMessageFlags.ACTION_COMPLETE,
        data: data || {}
    };
    //logger.response(JSON.stringify(response));
    res.status(responseMessageFlags.ACTION_COMPLETE).send(JSON.stringify(response));
};

const sendError = (res, languageCode, data, msg, errCode) => {
    let statusCode = responseMessageFlags.CLIENT_ERROR;
    switch (errCode) {
        case responseMessageCode.INVALID_ACCESS_TOKEN:
            statusCode = responseMessageFlags.UNAUTHORISED;
            break;

        case responseMessageCode.NO_DATA_FOUND:
            statusCode = responseMessageFlags.NOT_FOUND;
            break;
        case responseMessageCode.CLIENT_ERROR:
            statusCode = responseMessageFlags.CLIENT_ERROR;
            break;

        case responseMessageCode.ERROR_IN_EXECUTION:
            statusCode = responseMessageFlags.INTERNAL_SERVER_ERROR;
            break;
        case responseMessageCode.UPLOAD_ERROR:
            statusCode = responseMessageFlags.NOT_FOUND;
            break;
        case responseMessageCode.EMAIL_ALREADY_EXISTS:
            statusCode = responseMessageFlags.CONFLICT;
            break;
        case responseMessageCode.ACCOUNT_NOT_REGISTER:
            statusCode = responseMessageFlags.LoginError;
            break;

        case responseMessageCode.INVALID_CREDENTIALS:
            statusCode = responseMessageFlags.UNAUTHORISED;
            break;

        case responseMessageCode.USER_ALREADY_EXISTS:
            statusCode = responseMessageFlags.CONFLICT;
            break;
        case responseMessageCode.PARAMETER_MISSING:
            statusCode = responseMessageFlags.NOT_FOUND;
            break;
        case responseMessageCode.OLD_PASSWORD_INCORRECT:
            statusCode = responseMessageFlags.UNAUTHORISED;
            break;
        case responseMessageCode.TRIP_NOT_ADDED:
            statusCode = responseMessageFlags.DATAINUSE;
                break;
        default:
            statusCode = responseMessageFlags.INTERNAL_SERVER_ERROR;
            break;
    }
    const message = getResponseMessage(errCode, languageCode);

    const response = {
        message: msg || message || getResponseMessage(
            responseMessageCode.ERROR_IN_EXECUTION,
            languageCode
        ),
        status: statusCode,
        data: data || {}
    };
    logger.response(JSON.stringify(response));
    res.status(statusCode).send(JSON.stringify(response));
};

function sendCustomResponse(res, message, code, data) {
    const response = {
        message: message,
        status: code,
        data: data || {}
    };

    logger.response(JSON.stringify(response));
    res.status(code || 200).send(JSON.stringify(response));
}

module.exports = {
    actionCompleteResponse,
    sendError,
    sendCustomResponse
};