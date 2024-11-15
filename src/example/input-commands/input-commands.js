import shortcuts from "../../shortcuts.js";

export const registerAllInputCommands = () => {
    shortcuts.registerInputCommand("ping", () => console.log("submitted"), {}, () => console.log("before recieved"))
}