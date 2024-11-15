

const urlParams = new URLSearchParams(window.location.search);

const command = urlParams.get("command")
var config;

const getConfig = async () => {
    const result = await fetch(window.location.origin + '/input/config', {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({command: command})
        }
    );

    config = await result.json()

    console.log("Config:", config);
}

const submit = async () => {
    const result = await fetch(window.location.origin + '/input?command=' + command, {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({command: command})
        }
    );


    let body = await result.json();
    console.log("Result body:", body)
}


getConfig()
