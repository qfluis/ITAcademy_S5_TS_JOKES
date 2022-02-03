"use strict";
// Evento Click botón
const btn = document.getElementById("btn_chiste");
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", cargarChiste);
// Peticion del chiste a API
function cargarChiste() {
    const API_URL = "https://icanhazdadjoke.com";
    //const API_URL: string = "https://api.chucknorris.io/jokes/random";
    const HTMLResponse = document.getElementById("chiste");
    HTMLResponse.innerHTML = "Loading joke...";
    const options = {
        "method": "GET",
        "headers": {
            "Accept": "application/json"
        }
    };
    fetch(API_URL, options)
        .then((response) => response.json())
        .then((joke) => {
        HTMLResponse.innerHTML = joke.joke;
    });
}
