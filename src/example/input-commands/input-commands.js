import shortcuts from "../../shortcuts.js";

export const registerAllInputCommands = () => {
    shortcuts.registerInputCommand("pong", () => console.log("submitted"), {}, () => console.log("before recieved"))
}