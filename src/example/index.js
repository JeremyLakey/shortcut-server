

import shortcuts from "../shortcuts.js";
import { registerAllBasicCommands } from "./basic-commands/basic-commands.js";
import { registerAllInputCommands } from "./input-commands/input-commands.js";
import { getAllCustomCommands } from "./custom-commands/custom-commands.js";

registerAllBasicCommands();
registerAllInputCommands();

var asdf = getAllCustomCommands();
console.log(asdf);

shortcuts.startServer(undefined, false, asdf);