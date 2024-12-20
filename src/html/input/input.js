

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
    beep(100, 800, .05, "square", () => {beep(70, 600, .05, "square")})

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

document.addEventListener('keypress', function(event) {
    beep(40, 800, .3, "square")
    beep(40, 600, .3, "sawtooth")
    // beep(40, 800, .03, "sine")
    // beep(40, 800, .03, "triangle")
})


getConfig()




// found this code from https://stackoverflow.com/questions/879152/how-do-i-make-javascript-beep
var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);


//duration of the tone in milliseconds. Default is 500
//frequency of the tone in hertz. default is 440
//volume of the tone. Default is 1, off is 0.
//type of tone. Possible values are sine, square, sawtooth, triangle, and custom. Default is sine.
//callback to use on end of tone
function beep(duration, frequency, volume, type, callback) {
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    if (volume){gainNode.gain.value = volume;}
    if (frequency){oscillator.frequency.value = frequency;}
    if (type){oscillator.type = type;}
    if (callback){oscillator.onended = callback;}
    
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + ((duration || 500) / 1000));
};
