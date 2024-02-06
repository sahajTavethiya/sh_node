const english = require('../localisation/english');
const gujarati = require('../localisation/gujarati');

const LANGUAGES = {
    ENGLISH: 'en',
    GUJARATI : 'guj'
};

function getResponseMessage(code, languageCode) {
    switch (languageCode) {
        case LANGUAGES.ENGLISH:
            return english.responseMessages[code];
        case LANGUAGES.GUJARATI:
            return gujarati.responseMessages[code];
        default :
            return english.responseMessages[code];
    }
}
module.exports = {
    getResponseMessage
};
