$(document).ready(function(){

var searchInput 
var cityName = $('#activeCity'); 
var leftColumn = $('#leftColumn');
var wIcon = $('#wIcon')
var date = $('#currentDate')
var temp = $('#temperature');
var humidity = $('#humidity');
var wind = $('#wind-speed');
var UVindex = $('#UVindex'); 
var day1date = $('#day1date');
var day1temp = $('#day1temp');
var day1humidity = $('#day1humidity');
var day1icon = $('#wIcon1');
var day2date = $('#day2date');
var day2temp = $('#day2temp');
var day2humidity = $('#day2humidity');
var day2icon = $('#wIcon2');
var day3date = $('#day3date');
var day3temp = $('#day3temp');
var day3humidity = $('#day3humidity');
var day3icon = $('#wIcon3');
var day4date = $('#day4date');
var day4temp = $('#day4temp');
var day4humidity = $('#day4humidity');
var day4icon = $('#wIcon4');
var day5date = $('#day5date');
var day5temp = $('#day5temp');
var day5humidity = $('#day5humidity');
var day5icon = $('#wIcon5');

var apiKey = "c4ca0a8bcd276697a319df840918bfae";
var blockURL = "http://api.openweathermap.org/data/2.5/weather?&appid=" + apiKey + "&units=imperial"; 
var fivedayURL = "http://api.openweathermap.org/data/2.5/forecast?&appid=" + apiKey + "&units=imperial";


//Ajax call pull informaiton into the main City-Block data fields 
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

     //Ajax Call to a seperate API to get UV Index 
            var lon = OWData.coord.lon;
            var lat = OWData.coord.lat;
            var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
            $.ajax({url: uvURL,
                method: "GET"})
                .then(function(UVData){   
                UVindex.text(" " + UVData.current.uvi);
                
                // console.log(parseInt(UVindex.text))
    //Initiating UVcolor function to apply background color to UVindex  
                //UVcolor();
        })
    });
}

/* function UVcolor(){
    if(UVindex.text => 5){

    }

} */

function runForecast(forecastURL){
    $.ajax({url: forecastURL,
    method: "GET"})
    .then(function(forecastData){    
       // day1date.text((parseInt(forecastData.list[0].dt) * 1000).toLocaleSting("en-US", {timeZoneName: "short"}));
        day1date.text((dayjs((forecastData.list[0].dt * 1000)).format('M/DD/YY')));    
        day1temp.text(forecastData.list[0].main.temp.toFixed(0) + "℉");
        day1humidity.text(forecastData.list[0].main.humidity + "%");

        console.log(forecastData.list[0].weather[0].icon);
        day1icon.attr('src', "http://openweathermap.org/img/w/" + forecastData.list[0].weather[0].icon + ".png");
       
        day2date.text((dayjs((forecastData.list[9].dt * 1000)).format('M/DD/YY')));    
        day2temp.text(forecastData.list[9].main.temp.toFixed(0) + "℉");
        day2humidity.text(forecastData.list[9].main.humidity + "%");
        day2icon.attr('src', "http://openweathermap.org/img/w/" + forecastData.list[9].weather.icon + ".png");

        day3date.text((dayjs((forecastData.list[17].dt * 1000)).format('M/DD/YY')));    
        day3temp.text(forecastData.list[17].main.temp.toFixed(0) + "℉");
        day3humidity.text(forecastData.list[17].main.humidity + "%");
        day3icon.attr('src', "http://openweathermap.org/img/w/" + forecastData.list[17].weather.icon + ".png");
        
        day4date.text((dayjs((forecastData.list[25].dt * 1000)).format('M/DD/YY')));    
        day4temp.text(forecastData.list[25].main.temp.toFixed(0) + "℉");
        day4humidity.text(forecastData.list[25].main.humidity + "%");
        day4icon.attr('src', "http://openweathermap.org/img/w/" + forecastData.list[25].weather.icon + ".png");
    
        day5date.text((dayjs((forecastData.list[33].dt * 1000)).format('M/DD/YY')));    
        day5temp.text(forecastData.list[33].main.temp.toFixed(0) + "℉");
        day5humidity.text(forecastData.list[33].main.humidity + "%");
        day5icon.attr('src', "http://openweathermap.org/img/w/" + forecastData.list[33].weather.icon + ".png");    
  
   
    })
}







$('#searchBtn').on('click', function(event){
    searchInput = $("#searchInput").val().replace(" ","%20").trim();
    //records User Input and fixes spaces and cuts off unnecessary end spaces 
    //Puts the User Input into API URL for Ajax call 
        var newURL = blockURL + "&q=" + searchInput;
    //Send the URL with user inputted city to a function to pull Ajax call 
        runQuery(newURL);
        var forecastURL = fivedayURL + "&q=" + searchInput;
        runForecast(forecastURL);
        setInput();
    });


 //Function to save Unser Input into local storage // 
function setInput() {
    var citySearch = $(".list-group").html(`<li class="list-group-item">${searchInput}</li>`);
    localStorage.setItem("cities", searchInput);
 };



/// push searchInput into an empty array, set that to local storage and JSON.Parse, loop through array
// and for each that keeps adding:    
// $(".list-group").append(`<li class="list-group-item">${searchInput}</li>`);





//Function to retreive local storage input values// 
/*  function save(){
    $(".hour").each(function(){
      var currentTime = $(this).text();
      var storedInput = localStorage.getItem(currentTime);
      if (storedInput !== null) {
        $(this).siblings(".userInput").val(storedInput);
      }
    })
  } */


    // pull UV information from UV index API
    //set CSS class to be affected by UV index information 
//4. save Searched City into local storage so it reloads upon refresh. 


})
