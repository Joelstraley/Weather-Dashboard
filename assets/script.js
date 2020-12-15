$(document).ready(function(){

var apiKey = "c4ca0a8bcd276697a319df840918bfae";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?&appid=" + apiKey; 

var queryTerm = ""

console.log(runQuery("http://api.openweathermap.org/data/2.5/weather?&appid=c4ca0a8bcd276697a319df840918bfae&q=london")
);

function runQuery(queryURL){

    $.ajax({url: queryURL,
    method: "GET"})
    .done(function(OWData) {
        console.log(OWData);
    })
}

function(OWData) {

}

/* function clear() {
    $("#weatherblock").empty();
  } */


$('#searchBtn').on('click', function(event){
//records User Input and fixes spaces and cuts off unnecessary end spaces 
   var searchInput = $("#searchInput").val().replace(" ","%20").trim();
//Puts the User Input into API URL for Ajax call 
    var newURL = queryURL + "&q=" + searchInput;
//Send AJAX call the URL with user inputted city 
    runQuery(newURL)

cityName = $("#activeCity").val().trim();
temp = $('#temperature').val().trim();
humidity = $('#humidity').val().trim();
wind = $('#wind-speed').val().trim();
UVindex = ($"#UVindex").val().trim(); 


    return false;
});


//1. take citySearch input and do AJAX call to main OpenWeather API
    // - api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
 //2. Pull elements for Weather Object to insert into appropriate places in City Block area
    // pull UV information from UV index API
    //set CSS class to be affected by UV index information 
//3. Pulling from 5 day forecast Weather Object to load info into HTML Cards
//4. save Searched City into local storage so it reloads upon refresh. 


})
