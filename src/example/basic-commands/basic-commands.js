import shortcuts from "../../shortcuts.js";

import pwd from "./pwd.js";
import multi from "./multi.js";

export const registerAllBasicCommands = () => {
    shortcuts.registerBasicCommand("ping", ()=> console.log("Ping recieved on server"), {confirm:"want to ping?"});
    shortcuts.registerBasicCommand("pwd", pwd)
    shortcuts.registerBasicCommand("multi", multi, {confirm:"Open all these tabs?"})
}
