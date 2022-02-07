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
    let API_URL;
    const API_dad = "https://icanhazdadjoke.com";
    const API_chuck = "https://api.chucknorris.io/jokes/random";
    const HTMLResponse = document.getElementById("chiste");
    HTMLResponse.innerHTML = "Loading joke...";
    API_URL = (Math.random() > 0.5) ? API_dad : API_chuck;
    if (API_URL == API_dad) {
        const options = {
            "method": "GET",
            "headers": {
                "Accept": "application/json"
            }
        };
        fetch(API_URL, options)
            .then((response) => response.json())
            .then((joke) => {
            document.querySelector("#header_emoji h1").innerHTML = "Random dad joke";
            HTMLResponse.innerHTML = joke.joke;
            displayVotes("visible");
            changeBackground();
        });
    }
    else {
        // CHUCK NO NECESITA OPTIONS :)
        fetch(API_URL)
            .then((response) => response.json())
            .then((joke) => {
            document.querySelector("#header_emoji h1").innerHTML = "Chuck Norris Facts";
            HTMLResponse.innerHTML = joke.value;
            displayVotes("visible");
            changeBackground();
        });
    }
}
let backgroundNum = 0;
function changeBackground() {
    const imagen = document.getElementById("contenedor_chiste");
    let aleatorio;
    do {
        aleatorio = Math.floor(Math.random() * 5);
    } while (aleatorio == backgroundNum);
    backgroundNum = aleatorio;
    imagen.style.backgroundImage = `url('./images/backgrounds/${aleatorio}.png')`;
}
function displayVotes(visibility) {
    document.getElementById("valoracion").style.visibility = visibility;
    document.querySelector("#contenedor_chiste h3").style.visibility = visibility;
}
// WEATHER
myWeather(document.getElementById("myWeather"));
function myWeather(myDiv) {
    const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=barcelona, ES&appid=c28c4174fb91d10f3633362559cdc9c8&units=metric";
    myDiv.innerHTML = "Loading weather...";
    fetch(API_URL)
        .then((response) => response.json())
        .then((w) => {
        console.log(w);
        myDiv.innerHTML = `<img src="https://openweathermap.org/img/wn/${w.weather[0].icon}.png" > <strong>| ${w.main.temp}ºC</strong>`;
        // info iconos https://openweathermap.org/weather-conditions
    });
}
