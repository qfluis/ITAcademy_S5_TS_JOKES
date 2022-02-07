// BD ARRAY
interface IreportJoke {
    joke: string,
    score: number,
    date: string
}

const reportJokes: IreportJoke[] = [];

// Evento Click botón
const btn:HTMLElement | null = document.getElementById("btn_chiste");
btn?.addEventListener("click",cargarChiste);

// Eventos valoración
const btnValArray = document.querySelectorAll("#valoracion a img");
for (let btnVal of btnValArray) {
    btnVal.addEventListener("click", valorarChiste);
}

function valorarChiste():void{    
    displayVotes("hidden");
    const report:IreportJoke = {
        joke: document.getElementById("chiste")!.innerHTML,
        score: parseInt(this.alt),
        date: new Date().toISOString()
    }
    reportJokes.push(report);
    console.log(reportJokes);
}


// Peticion del chiste a API
function cargarChiste():void{
    let API_URL: string;
    const API_dad: string = "https://icanhazdadjoke.com";
    const API_chuck: string = "https://api.chucknorris.io/jokes/random";
    const HTMLResponse:HTMLElement | null = document.getElementById("chiste");
    HTMLResponse!.innerHTML = "Loading joke...";
    
    API_URL = (Math.random()>0.5)?API_dad:API_chuck;

    if (API_URL == API_dad){
        const options: RequestInit = {
            "method": "GET",
            "headers": {
                "Accept": "application/json"
            }
        }; 
        fetch (API_URL, options)
        .then((response) => response.json())
        .then((joke)=>{
            document.querySelector("#header_emoji h1")!.innerHTML = "Random dad joke";
            HTMLResponse!.innerHTML = joke.joke;
            displayVotes("visible");
            changeBackground();
        });
    } else {
        // CHUCK NO NECESITA OPTIONS :)
        fetch (API_URL)
        .then((response) => response.json())
        .then((joke)=>{
            document.querySelector("#header_emoji h1")!.innerHTML = "Chuck Norris Facts";
            HTMLResponse!.innerHTML = joke.value;
            displayVotes("visible");
            changeBackground();
        });
    } 
}

let backgroundNum:number = 0;

function changeBackground(){
    const imagen:HTMLElement | null = document.getElementById("contenedor_chiste");
    let aleatorio:number;
    do {
        aleatorio = Math.floor(Math.random()*5);
    } while (aleatorio == backgroundNum);
    backgroundNum = aleatorio;

    imagen!.style.backgroundImage = `url('./images/backgrounds/${aleatorio}.png')`;
}

function displayVotes(visibility:string):void{
    document.getElementById("valoracion")!.style.visibility = visibility;
    (<HTMLElement>document.querySelector("#contenedor_chiste h3"))!.style.visibility = visibility;
}

// WEATHER

myWeather(document.getElementById("myWeather"));
function myWeather(myDiv: HTMLElement | null):void{
    const API_URL: string = "https://api.openweathermap.org/data/2.5/weather?q=barcelona, ES&appid=c28c4174fb91d10f3633362559cdc9c8&units=metric";
    myDiv!.innerHTML = "Loading weather...";
        
    fetch (API_URL)
        .then((response) => response.json())
        .then((w)=>{
            console.log(w);
            myDiv!.innerHTML = `<img src="https://openweathermap.org/img/wn/${w.weather[0].icon}.png" > <strong>| ${w.main.temp}ºC</strong>`;
            // info iconos https://openweathermap.org/weather-conditions
        });    
}