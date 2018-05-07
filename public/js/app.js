$(document).ready(function () {
  const showMap = document.getElementById('map');
  let latitude;
  let longitude;
  let $temperature = $('#temperature');

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
    console.log(currentlyWheater.icon);
    $('#weather-box').prepend(`
      <img src=${'assets/images/' + currentlyWheater.icon + '.png'} alt=${currentlyWheater.icon} >
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

  // facebook share button
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v3.0';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Facebook code for OpenGraph
  var fbAppId = '249150542326294';
  var objectToLike = 'http://techcrunch.com/2013/02/06/facebook-launches-developers-live-video-channel-to-keep-its-developer-ecosystem-up-to-date/';

  // Additional JS functions here
  window.fbAsyncInit = function() {
    FB.init({
      appId      : fbAppId, // App ID
      status     : true,    // check login status
      cookie     : true,    // enable cookies to allow the
                            // server to access the session
      xfbml      : true,     // parse page for xfbml or html5
                            // social plugins like login button below
      version     : 'v2.7',  // Specify an API version
    });

    // Put additional init code here
  };
// Load the SDK Asynchronously
(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/*
* This function makes a call to the og.likes API.  The
* object argument is the object you like.  Other types
* of APIs may take other arguments. (i.e. the book.reads
* API takes a book= argument.)
*
* Because it's a sample, it also sets the privacy
* parameter so that it will create a story that only you
* can see.  Remove the privacy parameter and the story
* will be visible to whatever the default privacy was when
* you added the app.
*
* Also note that you can view any story with the id, as
* demonstrated with the code below.
*
* APIs used in postLike():
* Call the Graph API from JS:
*   https://developers.facebook.com/docs/reference/javascript/FB.api
* The Open Graph og.likes API:
*   https://developers.facebook.com/docs/reference/opengraph/action-type/og.likes
* Privacy argument:
*   https://developers.facebook.com/docs/reference/api/privacy-parameter
*/

function postLike() {
 FB.api(
    'https://graph.facebook.com/me/og.likes',
    'post',
    { object: objectToLike },
    function(response) {
      if (!response) {
        alert('Error occurred.');
      } else if (response.error) {
        document.getElementById('result').innerHTML =
          'Error: ' + response.error.message;
      } else {
        document.getElementById('result').innerHTML =
          '<a href=\"https://www.facebook.com/me/activity/' +
          response.id + '\">' +
          'Story created.  ID is ' +
          response.id + '</a>';
      }
    }
 );
}

});