let weather = {
    'apiKey': "REDACTED",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city 
            + "&units=imperial&appid="
            + this.apiKey
        )
    .then((response) =>{
        if (!response.ok){
            //alert("No weather found!");
            //throw new Error ("No weather found!");
            var confirmBox = $("#confirm");
            confirmBox.find(".message").text("No weather found!");
            confirmBox.find(".yes").unbind().click(function() {
                confirmBox.hide();
            });
            confirmBox.find(".yes").click();
            confirmBox.show();
        }
        return response.json();
    })
    .then((data) => this.displayWeather(data));

    },
    displayWeather: function(data){
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".speed").innerText = "Wind Speed: " + speed + "mph";
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
if (event.key == "Enter") {
    weather.search();
}
});

weather.fetchWeather("Chicago");