

const responseMessageCode = {
    MAX_LOGIN_DEVICES_REACHED: 'MAX_LOGIN_DEVICES_REACHED',
    PARAMETER_MISSING: 'PARAMETER_MISSING',
    INVALID_ACCESS_TOKEN: 'INVALID_ACCESS_TOKEN',
    INVALID_SOCIAL_LOGIN: 'INVALID_SOCIAL_LOGIN',
    CURRENT_PASSWORD_INCORRECT: 'CURRENT_PASSWORD_INCORRECT',
    OLD_PASSWORD_INCORRECT: 'OLD_PASSWORD_INCORRECT',
    INCORRECT_PASSWORD: 'INCORRECT_PASSWORD',
    ACTION_COMPLETE: 'ACTION_COMPLETE',
    LOGIN_SUCCESSFULLY: 'LOGIN_SUCCESSFULLY',
    ERROR_IN_EXECUTION: 'ERROR_IN_EXECUTION',
    UPLOAD_ERROR: 'UPLOAD_ERROR',
    PASSWORD_CHANGED_SUCCESSFULLY: 'PASSWORD_CHANGED_SUCCESSFULLY',
    EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
    EMAIL_REGISTERED_ALREADY: 'EMAIL_REGISTERED_ALREADY',
    EMAIL_NOT_EXISTS: 'EMAIL_NOT_EXISTS',
    NOT_A_VALID_IMAGE_LIST: 'NOT_A_VALID_IMAGE_LIST',
    SIZE_EXCEEDS: 'SIZE_EXCEEDS',
    VIDEO_SIZE_EXCEEDS: 'VIDEO_SIZE_EXCEEDS',
    ACCOUNT_NOT_REGISTER: 'ACCOUNT_NOT_REGISTER',
    USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
    DOCUMENT_UPLOADED: 'DOCUMENT_UPLOADED',
    NO_DATA_FOUND: 'NO_DATA_FOUND',
    USER_NOT_EXIST:'USER_NOT_EXIST',
    INVALID_CREDENTIALS : 'INVALID_CREDENTIALS',
    OTP_SENT : 'OTP_SENT',
    OTP_MISMATCH : 'OTP_MISMATCH',
    DAILY_STATS_ALREADY_ADDED : 'DAILY_STATS_ALREADY_ADDED',
    CLIENT_ERROR:"CLIENT_ERROR",
    TRIP_NOT_ADDED:"TRIP_NOT_ADDED",
    USER_REGISTRED:"USER_REGISTERED",
    NOT_PERMISSION_FOR_CREATE_USER :"NOT_PERMISSION_FOR_CREATE_USER",
    NOT_PERMISSION_FOR_CREATE_ORDER :"NOT_PERMISSION_FOR_CREATE_ORDER",
    NOT_PERMISSION_FOR_THIS_FUNCTIONALITY : "NOT_PERMISSION_FOR_THIS_FUNCTIONALITY",
    ORDER_ADDED_SUCCESSFULLY : "ORDER_ADDED_SUCCESSFULLY",
    PLEASE_ENTER_EMAIL : "PLEASE_ENTER_EMAIL",
    PLEASE_ENTER_PASSWORD : "PLEASE_ENTER_PASSWORD",
    ORDER_IS_COMPLETE : "ORDER_IS_COMPLETE",
    MANUFACTURED_ITEM_SUCCESSFULLY : "MANUFACTURED_ITEM_SUCCESSFULLY",
    PRODUCTION_DATA_GET_SUCCESSFULLY : "PRODUCTION_DATA_GET_SUCCESSFULLY",
    DATA_GET_SUCCESSFULLY : "DATA_GET_SUCCESSFULLY"
    
};

const responseMessageFlags = {
    ACTION_COMPLETE: 200,
    CLIENT_ERROR: 400,
    INTERNAL_SERVER_ERROR: 500,
    CONFLICT:409,
    UNAUTHORISED: 401,
    DATAINUSE:201,
    LoginError : 201,
    NOT_FOUND:404,
    FORBIDDEN : 403
};
const LookUpMaster = {
    RoleMaster : 'RoleMaster',
    StockItemMaster : 'StockItemMaster'
}

const colorCodes = {
    FgBlack: '\x1b[30m\x1b[1m%s\x1b[0m',
    FgRed: '\x1b[31m\x1b[1m%s\x1b[0m',
    FgGreen: '\x1b[32m\x1b[1m%s\x1b[0m',
    FgYellow: '\x1b[33m\x1b[1m%s\x1b[0m',
    FgBlue: '\x1b[34m\x1b[1m%s\x1b[0m',
    FgMagenta: '\x1b[35m\x1b[1m%s\x1b[0m',
    FgCyan: '\x1b[36m\x1b[1m%s\x1b[0m',
    FgWhite: '\x1b[37m\x1b[1m%s\x1b[0m'
};

const ALLOWED_IMAGE_MIME_TYPE = ['image/jpeg','image/jpg','image/pjpeg','image/png','image/*'];
const ALLOWED_VIDEO_MIME_TYPE = ['video/mp4','video/avi','video/wmv', 'video/*'];
const ALLOWED_MUSIC_MIME_TYPE = ['sound/mp3','sound/wav','sound/aac' , 'sound/*'];
const MAX_IMAGE_SIZE_ALLOWED = 1024 * 1024 * 15; // 15 MB
const MAX_VIDEO_SIZE_ALLOWED = 1024 * 1024 * 15; // 15 MB
const MAX_MUSIC_SIZE_ALLOWED = 1024 * 1024 * 5; // 5 MB

const IMAGE_DIMESIONS = {
    small_thumb: {
        width: 250,
        height: 250,
        key_name: 'small_thumb'
    },
    medium_thumb: {
        width: 400,
        height: 400,
        key_name: 'medium_thumb'
    }
};

const mediaType = {
    IMAGE: 2,
    AUDIO: 3,
    VIDEO: 1,
    DOCUMENT: 3

}
const TableName = {
    ScrapDatas : 'scrapdatas',
    ScrapUsers : "scrapusers",
    MusicDetails : 'musicdetails',
    Musictags : 'musictags',
    MusicLikes: 'musiclikes',
    CountryRelatedTag :'country_related_tags',
    MusicReported :'musicreporteds',
    WebConfig :'webconfigs',
    UserDetail : 'userdetails',
    UserToken :'usertokens',
    SearchAnalysData : 'search_analysis_datas',
    AdminDetails : 'admindetails'
    
}
const ex_slug = [["best free videos","best free videos on wavelino","video footage and clips","download free videos","whatsapp status video","short video status wavelino"]
    ,["download hd wallpaper","beautiful wallpaper on wavelino","wallpaper 4k","free wallpaper","free hd wallpapers","wallpapers for free"]
    ,["free mp3 ringtones","free ringtones","ringtones download","trending ringtones","mp3 ringtones download"]];
const emailProvider = ["@gmail.com","@yahoo.in","@yahoo.com","@company.com","@outlook.com"];
module.exports = {
    responseMessageCode,
    responseMessageFlags,
    colorCodes,
    ALLOWED_IMAGE_MIME_TYPE,
    ALLOWED_VIDEO_MIME_TYPE,
    ALLOWED_MUSIC_MIME_TYPE,
    MAX_IMAGE_SIZE_ALLOWED,
    MAX_VIDEO_SIZE_ALLOWED,
    MAX_MUSIC_SIZE_ALLOWED,
    IMAGE_DIMESIONS,
    mediaType,
    TableName,
    ex_slug,
    emailProvider
};
