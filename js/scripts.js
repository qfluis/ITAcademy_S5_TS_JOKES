"use strict";
const reportJokes = [];
// Evento Click botón
const btn = document.getElementById("btn_chiste");
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", cargarChiste);
// Eventos valoración
const btnValArray = document.querySelectorAll("#valoracion a img");
for (let btnVal of btnValArray) {
    btnVal.addEventListener("click", valorarChiste);
}
function valorarChiste() {
    displayVotes("hidden");
    const report = {
        joke: document.getElementById("chiste").innerHTML,
        score: parseInt(this.alt),
        date: new Date().toISOString()
    };
    reportJokes.push(report);
    console.log(reportJokes);
}
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
        displayVotes("visible");
    });
}
/*
function switchDisplayVotes(){
    const visible = document.getElementById("valoracion")!.style.visibility;
    let visibility:string = (visible == "visible")?"hidden":"visible";
        
    document.getElementById("valoracion")!.style.visibility = visibility;
    (<HTMLElement>document.querySelector("#contenedor_chiste h3"))!.style.visibility = visibility;
}*/
function displayVotes(visibility) {
    document.getElementById("valoracion").style.visibility = visibility;
    document.querySelector("#contenedor_chiste h3").style.visibility = visibility;
}
