const config = require('../configs/settings.json')

const logging = (text) => {
    if (config.debug) console.log(text);
}

module.exports = logging