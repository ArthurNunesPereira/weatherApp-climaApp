
const key = "e1d762e0204cd549df4686cfdfd4cf6d"
const countryElement = document.querySelector("#country");

async function getDataOnScreen (data) { 
    try {
        const apiCountryURL = `https://www.countryflagicons.com/FLAT/64/${data.sys.country}.png`;
        document.querySelector(".city").innerHTML = "Weather in " + data.name
        document.querySelector(".temp").innerHTML = Math.floor(data.main.temp) + " Cº."
        document.querySelector(".text-weather-mood").innerHTML = data.weather[0].description + "."
        countryElement.setAttribute("src", apiCountryURL);
        document.querySelector(".text-humidity").innerHTML = data.main.humidity + " %."
        document.querySelector(".bx-cloud").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    }catch {
        document.querySelector(".city").innerHTML = "Invalid venue!"
    }
    
}

async function searchCity(city) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`).then(response => response.json())

    getDataOnScreen(data)
}

function searchClick() {
    const city = document.querySelector(".input-city").value

    searchCity(city)
}

const cityInput= document.querySelector(".input-city")
cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      const city = e.target.value;
  
      searchClick()
    }
  });

  // PARTE NOVA
async function search() {
    const city = document.querySelector('input[type="text"]').value;
    const data = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`).then(response => response.json())
    
    const ul = document.querySelector('form ul')
    ul.innerHTML = ''
    for (let i = 0; i < data.length; i++) {
        const {name,lat,lon,country} = data[i]

        ul.innerHTML += `<li 
        data-lat = "${lat}" 
        data-lon = "${lon}" 
        data-name = "${name}">
        ${name} <span>${country}</span></li>`
    }

}

const debouncedSearch = _.debounce(() => {
    search();
}, 800);

document.querySelector('input[type="text"]').addEventListener('keyup', debouncedSearch)

 // PARTE NOVA 2
document.body.addEventListener('click', ev => {
    const li = ev.target;
    const {lat,lon,name} = li.dataset;
    if (!name) {
        return;
    }

    const ul = document.querySelector('form ul') // LIMPAR A LISTA DEPOIS DE PESQUISAR
    ul.innerHTML = ''
    showWeather(name, lat, lon);
})

async function showWeather(name, lat, lon) {
    const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`).then(response => response.json())

    try {
        const apiCountryURL = `https://www.countryflagicons.com/FLAT/64/${data.sys.country}.png`;
        document.querySelector(".city").innerHTML = name;
        document.querySelector(".temp").innerHTML = Math.floor(data.main.temp) + " Cº."
        document.querySelector(".text-weather-mood").innerHTML = data.weather[0].description + "."
        countryElement.setAttribute("src", apiCountryURL);
        document.querySelector(".text-humidity").innerHTML = data.main.humidity + " %."
        document.querySelector(".bx-cloud").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    }catch {
        document.querySelector(".city").innerHTML = "Invalid venue!"
    }
}