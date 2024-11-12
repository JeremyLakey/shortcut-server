const config = require('../configs/settings.json')
const loggingMode = require('./loggingmode')

const logging = (text) => {
    if (config.debug || loggingMode.loggingMode) console.log(text);
}

module.exports = logging