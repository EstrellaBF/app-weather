$(document).ready(function () {
  const showMap = document.getElementById('map');
  let latitude;
  let longitude;
  let $temperature = $('#temperature');

  const weatherIcons = ['clear','clear-night', 'cloudy','icon', 'partly-cloudy-day', 'partly-cloudy-night'];

  // Función para acceder al api DarkSky
  let getApiWheater = (data) => {
    data.flags.units = 'si'; //pasando a celsius
    // console.log(data)
    // console.log(data); //{latitude: -12.0329985, longitude: -77.0692949, timezone: "America/Lima", currently: {…}, hourly: {…}, …}
    let currentlyWheater = data.currently;
    // console.log('currently wheater',currentlyWheater);
    let summaryDesc = currentlyWheater.summary;
    let humidity = currentlyWheater.humidity;
    let description = data.daily.summary;

    $('#temperature').text((data.currently.temperature).toFixed(0) + '°');
    $('#temperature-description').text(summaryDesc);
    $('#humidity').text(humidity);
    $('#description').text(description);
    $('#weather-box').prepend(`
      <img src=${'../assets/images/' + currentlyWheater.icon + '.png'} alt=${currentlyWheater.icon} >
   `);

    // Week vista
    var d = new Date();
    var n = d.getDay(data.daily.data[0].time);
    // console.log(d); // fecha y hora actual

    let daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    for(var i = 0; i < daysOfWeek.length; i++) {
      // console.log(daysOfWeek[i]);
      $('#week-weather').append(
        `<div class="center-container container-data-week" >
        <img src=${'../assets/images/' + data.daily.data[i].icon + '.png'} alt=${data.daily.data[i].icon} />
          <h3>${daysOfWeek[i]} : </h3>
          <p>${(data.daily.data[i].temperatureHigh).toFixed(0)}° - ${(data.daily.data[i].temperatureLow).toFixed(0)}°</p>
        </div>`
      );
    }
    // console.log(daysOfWeek[d.getDay()]); //monday
    // console.log(d.getDay()); //1


  };

  // En caso el usuario no acepte conocer ubicación
  let error = () => {
    console.log('no se ingresó nada');
  };

  if (navigator.geolocation) {
    // alert('Puedes usar geolocalización en tu dispositivo');
    let getPosition = (position) => {
      ;
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      // guardando en localstorage
      localStorage.lat = latitude;
      localStorage.long = longitude;

      var proxy = 'https://cors-anywhere.herokuapp.com/';
      var apiLinkDS = `https://api.darksky.net/forecast/5ff2d970aaf45a79eb77da634a352045/${latitude},${longitude}?units=si`;
      $.ajax({
        url: proxy + apiLinkDS,
        success: getApiWheater
      });
    };
    navigator.geolocation.getCurrentPosition(getPosition, error);
  } else {
    alert('No se pudo ubicarte');
  }

  $('#predictions').on('click', function () {
    window.location.href = 'views/week.html';
  });

});