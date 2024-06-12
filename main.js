const api = {
    key: "d572ceda4f24abb5c103b673c80711ca",
    base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((weather) => {
            return weather.json();
        })
        .then(displayResults);
}

function displayResults(weather) {
    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerText = dateBuilder(now);

    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector(".current .weather");
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector(".hi-low");
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
        weather.main.temp_max
    )}°c`;

    // Обновление фона
    updateBackground(weather.weather[0].main.toLowerCase());
}

function updateBackground(weather) {
    let background = "";
    switch (weather) {
        case "clouds":
            background = "url('images/clouds.png')";
            break;
        case "rain":
            background = "url('images/rain.png')";
            break;
        case "sunny":
        case "clear":
            background = "url('images/clear.png')";
            break;
        case "snowy":
            background = "url('images/snowy.png')";
        // Добавьте другие условия, если нужно
        default:
            background = "url('images/default.png')";
    }
    document.body.style.backgroundImage = background;
}

function dateBuilder(d) {
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();

    return `${day} ${date} ${months[month]} ${year}`;
}
