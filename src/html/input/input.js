

const urlParams = new URLSearchParams(window.location.search);

const command = urlParams.get("command")
var context;

const getContext = async () => {
    const result = await fetch(window.location.origin + '/input/context', {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({command: command})
        }
    );

    context = await result.json()

    console.log("Context:", context);
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


getContext()
