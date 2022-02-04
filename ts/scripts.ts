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
    const API_URL: string = "https://icanhazdadjoke.com";
    //const API_URL: string = "https://api.chucknorris.io/jokes/random";
    const HTMLResponse:HTMLElement | null = document.getElementById("chiste");
    HTMLResponse!.innerHTML = "Loading joke...";
        
    const options: RequestInit = {
        "method": "GET",
        "headers": {
            "Accept": "application/json"
        }
    };    
    
    fetch (API_URL, options)
        .then((response) => response.json())
        .then((joke)=>{
            HTMLResponse!.innerHTML = joke.joke;
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
function displayVotes(visibility:string):void{
    document.getElementById("valoracion")!.style.visibility = visibility;
    (<HTMLElement>document.querySelector("#contenedor_chiste h3"))!.style.visibility = visibility;
}




// Weather

myWeather(document.getElementById("myWeather"));
function myWeather(myDiv: HTMLElement | null):void{
    const API_URL: string = "https://api.openweathermap.org/data/2.5/weather?q=barcelona, ES&appid=c28c4174fb91d10f3633362559cdc9c8&units=metric";
    myDiv!.innerHTML = "Loading weather...";
        
    fetch (API_URL)
        .then((response) => response.json())
        .then((w)=>{
            console.log(w);
            myDiv!.innerHTML = `${w.weather[0].description} - ${w.main.temp}ºC`;
        });
    

}