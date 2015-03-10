// Description:
//   hubot search in forecast apis =D
//
// Commands:
//   !forecast <city> - Weather forcast for <city>
//   !weather <city>  - Current weather in <city>
//
// Author:
//   pastjean
//   fverpaelst
//   guisim

var request = require("request");
var	moment  = require("moment");


var idToIcon = {
	'01d': ':clearsky:',
	'01n': ':clearskyn:',
	'02d': ':fewclouds:',
	'02n': ':fewcloudsn:',
	'03d': ':scatteredclouds:',
	'03n': ':scatteredclouds:',
	'04d': ':brokenclouds:',
	'04n': ':brokenclouds:',
	'09d': ':showerrain:',
	'09n': ':showerrainn:',
	'10d': ':rain:',
	'10n': ':rainn:',
	'11d': ':thunderstorm:',
	'11n': ':thunderstorm:',
	'13d': ':snow:',
	'13n': ':snow:',
	'50d': ':mist:',
	'50n': ':mist:',
}

var getIconForWeather = function(weathericon){
	return idToIcon[weathericon] ? idToIcon[weathericon] : '#noIconForcode['+weathericon+']'
}

var forecastTemplate = function(data){
	var result = 'Weather in *' + data.city.name + '*, ' +data.city.country + ' for the next *5* days: \n';

	var days = data.list.map(function(day){
		return '\t on *' + moment(day.dt,'X').format('dddd') + '*' +
					 ': *' + day.weather[0].main  + '*' +
					 ' at *' + (day.temp.day - 273.15).toFixed(2) + '°C*' +
					 ' [ max :' + (day.temp.max - 273.15).toFixed(2) + '°C,' +
			  	 ' min :' + (day.temp.min - 273.15).toFixed(2) + '°C ]' ;

	}).join('\n');


	return result + days;
};

module.exports = function(robot){
	robot.hear(/^!forecast (.*)/i,function(msg){
		var where = encodeURIComponent(msg.match[1]);

		request('http://api.openweathermap.org/data/2.5/forecast/daily?cnt=5&q=' + where, function(err,res,body){
			if (err || res.statusCode != 200) {
				msg.send('Error:' + err);
				return;
			}

			var data = JSON.parse(body);
			if(data.cod != "200"){
				msg.send(data.message);
				return;
			}
			console.log(JSON.stringify(data));
			msg.send(forecastTemplate(data));
		});
	});


	robot.hear(/^!weather (.*)/i,function(msg){
		var where = encodeURIComponent(msg.match[1]);

		request('http://api.openweathermap.org/data/2.5/weather?q=' + where, function(err,res,body){
			if (err || res.statusCode != 200) {
				msg.send('Error:' + err);
				return;
			}

			var data = JSON.parse(body);
			if(data.cod != "200"){
				msg.send(data.message);
				return;
			}

			msg.send('Current weather in *'+ data.name + '*'+
							 ', ' + data.sys.country +
							 ': *' + (data.main.temp - 273.15).toFixed(2) + '°C*, ' +
							 data.weather[0].main);

		});
	});
};
