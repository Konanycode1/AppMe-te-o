const cle = "e7706d093f2723c43a3ec97836f930c4";
let resultatApi;
let temps = document.querySelector(".temps");
let temp = document.querySelector(".temperature")
let local = document.querySelector(".localisation")
const heure =  document.querySelectorAll(".heure-NP");
const tempH = document.querySelectorAll(".heure-PV")

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
        // console.log(position)
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppleAPI(long,lat)
    }, ()=>{
        alert(`Vous avez refusé la gélocalisation, l'application ne peur pas fonctionner, veuillez l'activer`)
    })
}

function AppleAPI(long, lat) {
    // console.log(long, lat)
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${cle}`)
    .then((reponse)=>{
        return reponse.json();
    })
    .then((data)=> {
        resultatApi = data;
        console.log(resultatApi)
        temps.innerText = resultatApi.weather[0].description
        temp.innerText = `${Math.trunc(resultatApi.main.temp)}°`
        local.innerText =`${ resultatApi.sys.country}/ ${resultatApi.name}`;

        // les heures par tranche de trois, avec leur temerature

        let heureActuelle = new Date().getHours();
        for(let i = 0; i < heure.length; i++){
            let heureIncr = heureActuelle + i*3;
            if(heureIncr > 24){
                heure[i].innerText = `${heureIncr - 24}h`

            }
            else if ( heureIncr === 24 ){
                heure[i].innerText = `00h`
            }
            else{
                heure[i].innerText = `${heureIncr}h`
            }
            
        }
        // for (let j = 0; j < tempH.length; j++) {
        //     tempH[j].innerText = `${resultatApi.hourly[j * 3].temp}°`
            
        // }

        // fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${resultatApi.coord.lat}&lon=${resultatApi.coord.lon}&exclude=minutely&units=metric&lang=fr&appid=${cle}`)
        // .then((resp) =>{
        //     return resp.json();
        // })
        // .then( (donne)=> {
        //     console.log(donne)
        // })

    });

}