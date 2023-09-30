const input_box = document.querySelector('.input-box')
const searchbtn = document.getElementById('searchbtn')
const weather_img = document.querySelector('.weather-img')
const temperature = document.querySelector('.temperature')
const description = document.querySelector('.description')
const humidity = document.getElementById('humidity')
const wind = document.getElementById('wind-speed')
const location_not = document.querySelector('.location_not')
const weather_body = document.querySelector('.weather-body')

async function checkweacher(city){
   const api = "2c07fa80bc37e49c428295819c63fb57";
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;

   const weather_data = await fetch(`${url}`).then(response => response.json());
   
    if(weather_data.cod === "404"){
        location_not.style.display = "flex";
        weather_body.style.display = "none"
        console.log("error");
        return;
    }

    weather_body.style.display = "flex";
    location_not.style.display = "none";

   temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
   description.innerHTML = `${weather_data.weather[0].description}`;
   humidity.innerHTML = `${weather_data.main.humidity}%`;
   wind.innerHTML = `${weather_data.wind.speed}Km/H`;

   
   switch(weather_data.weather[0].main){
    case 'cloud':
    weather_img.src = "images/cloud.png";
    break;
    case 'clear':
    weather_img.src = "images/clear.png";
    break
    case 'rain':
    weather_img.src = "images/rain.png";
    break;
    case 'snow':
    weather_img.src = "images/snow.png";
    break;
   }




}

searchbtn.addEventListener('click', ()=>{
    checkweacher(input_box.value)
})