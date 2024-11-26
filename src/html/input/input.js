

const urlParams = new URLSearchParams(window.location.search);

const command = urlParams.get("command")
var config;
var form = window.document.getElementById("form");

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

    // title
    window.document.getElementById("tab-title").innerHTML = config.title ? config.title : command

    // style
    window.document.getElementById("style").innerHTML = config.style

    // form
    form.innerHTML = config.form ? config.form : "<input type=\"text\" name=\"text\" value=\"\" autofocus autocomplete=\"off\"></input><input style=\"display:none\" type=\"submit\" value=\"Submit\"></input>"
    form.addEventListener("submit", submit)

    // code

    // result
}

const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    console.log(event.target);
    let formObject = {}

    for (const [key, v] of formData.entries()) {
        formObject[key] = v
    }

    const result = await fetch(window.location.origin + '/input?command=' + command, {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify(formObject)
        }
    );


    let body = await result.json();
    console.log("Result body:", body)

    // reset
    if (!body.reset) {form.reset()}

    // result

    // redirects

}


getConfig()
