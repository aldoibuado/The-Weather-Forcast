var currentDate = luxon.DateTime.now().toJSDate();
console.log("time", currentDate);

//alert("hello");
const APIkey = "04720b45ac530cdf4a76a45ca5a21056";
let latitude = 0;
let longitude = 0;

//const city;
const x = document.getElementById("demo");
// window.onload = (event) => {
//   currentLocation();
// };
function currentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function weather(city) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`;
  const history = JSON.parse(localStorage.getItem("cities")) || [];
  if (!history.includes(city)) {
    history.push(city);
    localStorage.setItem("cities", JSON.stringify(history));
  }
  displayHistory();
  fetch(weatherUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById("city").innerHTML = city;
      let K = data.main.temp;
      // let farenheit = Math.floor(1.8 * (K - 273) + 32);
      document.getElementById("temperature").innerHTML = `temp: ${K}`;
      let Meterspersecond = data.wind.speed;
      let Milesperhour = Meterspersecond * 2.236936;
      document.getElementById("wind").innerHTML = `wind: ${Milesperhour}`;

      document.getElementById(
        "humidity"
      ).innerHTML = `humidity: ${data.main.humidity} %`;
      fivedayforcast(city);
    });
}

function showPosition(position) {
  //   x.innerHTML =
  //     "Latitude: " +
  //     position.coords.latitude +
  //     "<br>Longitude: " +
  //     position.coords.longitude;
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  console.log(latitude, longitude);
  weather();
}

document.getElementById("button").addEventListener("click", function (event) {
  event.preventDefault();
  let city = document.getElementById("city-area").value;
  weather(city);
});

// function to get five day forcast
function fivedayforcast(city) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=imperial`;
  fetch(weatherUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      for (i = 0; i < data.list.length; i += 8) {
        var date = data.list[i].dt;
        var dateEl = document.createElement("p");
        dateEl.innerText = moment.unix(date).format("MMMM Do YYYY");
        var temp = document.createElement("p");
        temp.innerText = data.list[i].main.temp;
        var wind = document.createElement("p");
        wind.innerText = data.list[i].wind.speed;
        var humidity = document.createElement("p");
        humidity.innerText = data.list[i].main.humidity;
        var container = document.createElement("div");
        var icon = document.createElement("img");
        icon.src = `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`;
        container.appendChild(dateEl);
        container.appendChild(icon);
        container.appendChild(temp);
        container.appendChild(wind);
        container.appendChild(humidity);
        document.querySelector("#five-day").appendChild(container);
      }
    });
}

function displayHistory() {
  const history = JSON.parse(localStorage.getItem("cities")) || [];
  document.querySelector("#cities").innerHTML = "";
  for (i = 0; i < history.length; i++) {
    const button = document.createElement("button");
    button.innerText = history[i];
    button.addEventListener("click", (event) =>
      weather(event.target.innerText)
    );
    document.querySelector("#cities").appendChild(button);
  }
}

displayHistory();
