
import { rejects } from "assert";
import ChildProcess from "child_process";
import { resolve } from "path";

const pwd = () => {
    const child = ChildProcess.spawn('echo', ["%cd%"], {shell: true});

    var text = ""
    var promiseResolve, promiseReject;
    let promise = new Promise((resolve, reject) => {
        promiseResolve = resolve;
        promiseReject = reject;
    })

    child.stdout.on('data', (data) => {
        text += data.toString();
    })

    child.stderr.on('data', (data) => {
        console.error(data.toString());
    })

    child.on('close', (code) => {
        // console.log('pwd closed with code: ', code.toString())
        console.log(text);
        promiseResolve(text);
    });

    child.on('error', (err) => console.error(err));

    return promise;
}

export default pwd;