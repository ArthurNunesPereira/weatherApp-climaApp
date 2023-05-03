const key = "e1d762e0204cd549df4686cfdfd4cf6d"

async function searchCity(city) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`).then(response => response.json())

    console.log(data)
}

function searchClick() {
    const city = document.querySelector(".input-city").value

    searchCity(city)
}

