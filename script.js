const apiKey = "cd98b79a22311744be675022aef5594d";
      const apiUrl =
        "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

      const searchBox = document.querySelector(".search input");
      const searchBtn = document.querySelector(".search button");
      const weatherIcon = document.querySelector(".weather-icon");

      async function checkWeather(city) {
        const response = await fetch(apiUrl + city+ `&appid=${apiKey}`);
        var data = await response.json();

        if (response.status == 404) {
          document.querySelector(".error").style.display = "block";
          document.querySelector(".weather").style.display = "none";
        } else {
          document.querySelector(".city").innerHTML = data.name;
          document.querySelector(".temp").innerHTML =
            Math.round(data.main.temp) + "°c";
          document.querySelector(".humidity").innerHTML =
            data.main.humidity + "%";
          document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;

          if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "image/clouds.png";
          } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "image/rainy.png";
          } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "image/sunnycloudy.png";
          } else if (data.weather[0].main == "Sunny") {
            weatherIcon.src = "image/sunny.png"; //default icon for other cases (Snow,D
          }
          document.querySelector(".weather").style.display = "block";
        }
      }

      searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
      });
      const locbtn = document.getElementById("loc-btn");

     
    async function checkWeatherusingloc(latitude, longitude) {
        const response = await fetch(`${apiUrl}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
        var data = await response.json();
    
        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML =
                Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").innerHTML =
                data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;
    
            // Assuming you have declared weatherIcon globally
            if (data.weather[0].main == "Clouds") {
                weatherIcon.src = "image/clouds.png";
            } else if (data.weather[0].main == "Rain") {
                weatherIcon.src = "image/rainy.png";
            } else if (data.weather[0].main == "Clear") {
                weatherIcon.src = "image/sunnycloudy.png";
            } else if (data.weather[0].main == "Sunny") {
                weatherIcon.src = "image/sunny.png";
            }
            document.querySelector(".weather").style.display = "block";
        }
    }
    
    async function gotlocation(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        await checkWeatherusingloc(latitude, longitude);
    }
    
    function failedToGet() {
        console.log("Failed to get weather");
    }
    
    locbtn.addEventListener("click", async () => {
        navigator.geolocation.getCurrentPosition(gotlocation, failedToGet);
    });
    