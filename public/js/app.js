$(document).ready(function () {
  const showMap = document.getElementById('map');
  let latitude;
  let longitude;
  let $temperature = $('#temperature');

  // Función para acceder al api DarkSky
  let getApiWheater = (data) => {
    let currentlyWheater = data.currently;
    // console.log(currentlyWheater.temperature);
    let temperatureFarenheit = currentlyWheater.temperature;
    let temperatureCentigrados = parseInt(((temperatureFarenheit - 32) * 5 / (9.340)), 10);
    // console.log(temperatureCentigrados); // 23° convertidos de farenheit
    let summary = currentlyWheater.summary;
    let humidity = currentlyWheater.humidity;
    let summary2 = data.daily.summary;

    $('#temperature').text(`${temperatureCentigrados}º`);
    $('#summary').text(summary);
    $('#humidity').text(humidity);
    $('#summary2').text(summary2);

    // Week vista
    // console.log(data);
    console.log(data.daily.data);
    // console.log(data.daily.data[0].time);
    var d = new Date();
    var n = d.getDay(data.daily.data[0].time);
    // console.log(n);

    let $daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    $.each($daysOfWeek, function(index, val) {
      console.log(index);
        $('.current-wheater').append(`<div id="day-position-${index}"><p>${data.daily.data[index].summary}</p></div>`);
        console.log(data.daily.data[index]); // desde la primera posición
      if(n === index){
        console.log(index);
        // console.log(d.getDay(data.daily.data[index].time));
        console.log(val); // la fecha en este caso Saturday
        // $('#day-position-')
      } else {
        console.log('nada');
      }
    });
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
      var apiLinkDS = `https://api.darksky.net/forecast/5ff2d970aaf45a79eb77da634a352045/${latitude},${longitude}`;
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