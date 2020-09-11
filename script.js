const api = {
    key: "23c4e135b8fbf9858feeedb27c620242",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const weatherReport = () => {
    const search = document.querySelector(".fa-search")
    const input = document.querySelector(".input-field")

    search.addEventListener("click", () => {
        fetchApi(input.value);
        console.log(input.value)
    })

    function fetchApi (query) {
        fetch(`${api.baseurl}weather?q=${query}&units=metric&appid=${api.key}`)
          .then(weather => {
            return weather.json();
          }).then(getResults);
          registerSW()

      }

    const getResults = (weather) => {
        console.log(weather)
        let location = document.querySelector('.location')
        location.innerText= `${weather.name}, ${weather.sys.country}`
      
        let temp = document.querySelector('.temp')
        temp.innerHTML = `${weather.main.temp}  <span>&#176;C</span>`

        let description = document.querySelector('.description')
        description.innerHTML = `${weather.weather[0].main}, ${weather.weather[0].description}.`

        let now = new Date();
        let datefield = document.querySelector(".date");
        datefield.innerText = dateBuilder(now);

        let long = document.querySelector('.long')
        long.innerText = `${weather.coord.lon}` 

        let lat = document.querySelector('.lat')
        lat.innerText = `${weather.coord.lat}` 

        let humidity = document.querySelector('.hum')
        humidity.innerText = `${weather.main.humidity}` 

        let pressure = document.querySelector('.pressure')
        pressure.innerText = `${weather.main.pressure}mmHg` 
    }
    const dateBuilder = (d) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let days =  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let day = days[d.getDay()]
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day}, ${month} ${date}, ${year}`


    }
    
}

weatherReport();
async function registerSW() {
    if('serviceworker' in navigator) {
        try {
            await navigator.serviceworker.register('./sw.js');
        } catch (e) {
            console.log('SW registration failed')
        }
    }
}