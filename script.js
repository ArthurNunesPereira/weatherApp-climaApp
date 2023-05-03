const key = "e1d762e0204cd549df4686cfdfd4cf6d"

function getDataOnScreen(data) {
    try {
        document.querySelector(".city").innerHTML = "Weather in " + data.name
        document.querySelector(".temp").innerHTML = Math.floor(data.main.temp) + " Cº."
        document.querySelector(".text-weather-mood").innerHTML = data.weather[0].description + "."
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