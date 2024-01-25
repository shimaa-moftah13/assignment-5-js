var todayName = document.getElementById("todayName")
var todayNumber = document.getElementById("todayNumber")
var todayMonth = document.getElementById("todayMonth")
var todayLocation = document.getElementById("todayLocation")
var todayTemp = document.getElementById("todayTemp")
var todayImg = document.getElementById("todayImg")
var todayCondition = document.getElementById("todayCondition")
var humidity = document.getElementById("humidity")
var wind = document.getElementById("wind")
var windDirection = document.getElementById("windDirection")
var weatherDate

// next date
var nextDayName = document.getElementsByClassName("next-day")
var nextMaxTemp = document.getElementsByClassName("next-max-temp")
var nextMinTemp = document.getElementsByClassName("next-min-temp")
var nextConditionImg = document.getElementsByClassName("next-condition-img")
var nextConditionText = document.getElementsByClassName("next-condition-text")

// search input
var searchInput = document.getElementById("searchInput") 

let date = new Date()
// console.log(date.getDate())
// console.log(date.toLocaleDateString("en-US",{weekday: "long"}))
// console.log(date.toLocaleDateString("en-US",{month: "long"}))
// fetch data

async function fetchData(cityName){
    var weatherRespons = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ef07e5eacf4a438eb9104047242401&q=${cityName}&days=3`)
    var weatherData = await weatherRespons.json();
    return weatherData
}
fetchData()

// display today data
function displayTodayData(data){
    let todayDate = new Date();      //"2023-9-6"
    todayName.innerHTML = todayDate.toLocaleDateString("en-US",{weekday: "long"})
    todayNumber.innerHTML = todayDate.getDate()
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US",{month: "long"})
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c+"<sup>o</sup>C"
    todayImg.setAttribute("src", data.current.condition.icon)
    todayCondition.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity+" %"
    wind.innerHTML = data.current.wind_kph+" km/h"
    windDirection.innerHTML = data.current.wind_dir

}
// display next days data
function displayNextData(data){
    var forecastData = data.forecast.forecastday
    for(var i= 0; i < 2 ; i++){
        let nextDate = new Date(forecastData[i+1].date);
        nextDayName[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday: "long"})
        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c+"<sup>o</sup>C"
        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c+"<sup>o</sup>"
        nextConditionImg[i].setAttribute("src", forecastData[i+1].day.condition.icon)
        nextConditionText[i].innerHTML = forecastData[i+1].day.condition.text

    }
}

async function startApp(city="cairo"){
    var weatherData = await fetchData(city)
    if(!weatherData.error){   
       displayTodayData(weatherData)
       displayNextData(weatherData)
    }

}
startApp()


searchInput.addEventListener("input", function(){
    startApp(searchInput.value)
})