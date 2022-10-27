var currentDate = luxon.DateTime.now().toJSDate();
console.log("time", currentDate);


//alert("hello");
const APIkey = "04720b45ac530cdf4a76a45ca5a21056";
let latitude = 0;
let longitude = 0;

//const city;
const x = document.getElementById("demo");
window.onload = (event) => {
  currentLocation();
};
function currentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function weather() {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIkey}`;
  fetch(weatherUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById("city").innerHTML = data.city.name;
      let K = data.list[0].main.temp;
      let farenheit = Math.floor(1.8 * (K - 273) + 32);
      document.getElementById("temperature").innerHTML = `temp: ${farenheit}`;
      let Meterspersecond = data.list[0].wind.speed;
      let Milesperhour = Meterspersecond * 2.236936;
      document.getElementById("wind").innerHTML = `wind: ${Milesperhour}`;

      document.getElementById(
        "humidity"
      ).innerHTML = `humidity: ${data.list[0].main.humidity} %`;
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
