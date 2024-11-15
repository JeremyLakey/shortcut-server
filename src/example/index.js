

import shortcuts from "../shortcuts.js";
import { registerAllBasicCommands } from "./basic-commands/basic-commands.js";
import { registerAllInputCommands } from "./input-commands/input-commands.js";

registerAllBasicCommands();
registerAllInputCommands();

shortcuts.startServer();