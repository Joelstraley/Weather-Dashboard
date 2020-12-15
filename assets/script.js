$(document).ready(function(){

var queryURL = "http://api.openweathermap.org/data/2.5/weather?&appid=" + apiKey + "&q=" + queryTerm;
var apiKey = "c4ca0a8bcd276697a319df840918bfae";

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

/* function clear() {
    $("#weatherblock").empty();
  } */


$('#citySearch').on('click', function(event){
   alert("test");
   console.log(queryURL)
    runQuery("http://api.openweathermap.org/data/2.5/weather?&appid=c4ca0a8bcd276697a319df840918bfae&q=london");
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
