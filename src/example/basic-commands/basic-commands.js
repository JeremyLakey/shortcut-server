import shortcuts from "../../shortcuts.js";

export const registerAllBasicCommands = () => {
    shortcuts.registerBasicCommand("ping", ()=> console.log("Ping recieved on server"));
}