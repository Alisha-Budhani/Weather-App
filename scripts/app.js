const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

cityForm.addEventListener('submit', e => {
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();
    updateCity(city)
        .then(data => {
            updateUI(data);
        }).catch(err => {
            console.log(err)
        })
})

const updateCity = async (city) => {
    const cityDest = await getCity(city);
    const weather = await getWeather(cityDest.Key);
    localStorage.setItem('city', city);
    return {
        cityDest: cityDest,
        weather: weather
    };
}

const updateUI = (data) => {
    const cityDest = data.cityDest;
    const weather = data.weather;

    details.innerHTML =
        `<div class="text-muted text-uppercase text-center details">
            <h5 class="my-3">${cityDest.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
                <span>${weather.Temperature.Metric.Value}</span>
                <span>&deg;C</span>
            </div>
        </div>`


    //update image and icon
    let timeSource = null;
    let iconSource = `image/icons/${weather.WeatherIcon}.svg`
    if(weather.IsDayTime){
        timeSource = 'image/day.svg';
    }else{
        timeSource = 'image/night.svg';
    }

    time.setAttribute('src',timeSource);
    icon.setAttribute('src',iconSource);
    
    //remove d-none class if already present
    if(card.classList.contains("d-none")){
        card.classList.remove("d-none")
    }
}

if((localStorage.getItem('city'))){
    updateCity(localStorage.getItem('city'))
    .then(data => {
        updateUI(data);
    }).catch(err => {
        console.log(err);
    })
}