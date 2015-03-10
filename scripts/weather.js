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
			msg.send('Weather in ' + data.city.name + ', ' + data.city.country + ' for the next 5 days\n ' + data.weathers.join('\n'));

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

			msg.send('Weather in '+ data.name + ', ' + data.sys.country + ': ' + (data.main.temp - 273).toFixed(2) + " °C, " + data.weather[0].main);

		});
	});
};
