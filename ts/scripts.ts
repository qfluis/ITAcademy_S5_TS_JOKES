
// Evento Click botón
const btn = document.getElementById("btn_chiste");
btn?.addEventListener("click",cargarChiste);


// Peticion del chiste a API
function cargarChiste(){
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
            //HTMLResponse!.innerHTML = joke.joke;
            console.log(joke.joke)
        });
    

}