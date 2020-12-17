$(document).ready(function(){

var cityName = $('#activeCity'); 
var wIcon = $('#wIcon')
var date = $('#currentDate')
var temp = $('#temperature');
var humidity = $('#humidity');
var wind = $('#wind-speed');
var UVindex = $('#UVindex'); 
var day1date = $('#day1date');
var day1temp = $('#day1temp');
var day1humidity = $('#day1humidity');

var apiKey = "c4ca0a8bcd276697a319df840918bfae";
var blockURL = "http://api.openweathermap.org/data/2.5/weather?&appid=" + apiKey + "&units=imperial"; 
var fivedayURL = "http://api.openweathermap.org/data/2.5/forecast?&appid=" + apiKey + "&units=imperial";


function runQuery(newURL){
    $.ajax({url: newURL,
    method: "GET"})
    .then(function(OWData){
        cityName.text(OWData.name+"  ");
        var weatherIcon = OWData.weather[0].icon; 
        var iconurl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
        wIcon.attr('src', iconurl);
        date.text(dayjs().format('M/DD/YYYY'));
        temp.text(" " + (OWData.main.temp).toFixed(0) + " ℉");
        humidity.text(" " + OWData.main.humidity + "%");
        wind.text(" " + (OWData.wind.speed).toFixed(1) + " mph");

            var lon = OWData.coord.lon;
            var lat = OWData.coord.lat;
            var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
            $.ajax({url: uvURL,
                method: "GET"})
                .then(function(UVData){   
                    console.log(lon);
                UVindex.text(UVData.current.uvi); 
        })
    });
}
   


function runForecast(forecastURL){
    $.ajax({url: forecastURL,
    method: "GET"})
    .then(function(forecastData){     
        day1date.text(dayjs().format('M/DD/YYYY'));
        console.log(forecastData.list[0].main.temp);
        day1temp.text(forecastData.list[0].main.temp);
    })
}



$('#searchBtn').on('click', function(event){
    //records User Input and fixes spaces and cuts off unnecessary end spaces 
       var searchInput = $("#searchInput").val().replace(" ","%20").trim();
    //Puts the User Input into API URL for Ajax call 
        var newURL = blockURL + "&q=" + searchInput;
    //Send the URL with user inputted city to a function to pull Ajax call 
        runQuery(newURL);
        var forecastURL = fivedayURL + "&q=" + searchInput;
        runForecast(forecastURL);
    });



    // pull UV information from UV index API
    //set CSS class to be affected by UV index information 
//3. Pulling from 5 day forecast Weather Object to load info into HTML Cards
//4. save Searched City into local storage so it reloads upon refresh. 


})
