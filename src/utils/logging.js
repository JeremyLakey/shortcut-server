import config from '../configs/settings.json' with {type: "json"}
import {loggingMode} from './loggingmode.js'

const logging = (text) => {
    if (config.debug || loggingMode.loggingMode) console.log(text);
}

export default logging