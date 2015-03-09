// Description:
//   Search on soundcloud
//
// Commands:
//   !soundcloud <keywoards> - Search for a SoundCloud song matching <keyword>
//
// Author:
//   pastjean
//   guisim
var request = require("request");
var HUBOT_SOUNDCLOUD_API_KEY = process.env.HUBOT_SOUNDCLOUD_API_KEY;

module.exports = function(robot){
	if(!HUBOT_SOUNDCLOUD_API_KEY){
		robot.logger.error('HUBOT_SOUNDCLOUD_API_KEY not set, please set the client id');
	}

	robot.hear(/^!soundcloud (.*)/i,function(msg){
		if(!HUBOT_SOUNDCLOUD_API_KEY){
			msg.send('HUBOT_SOUNDCLOUD_API_KEY environment variable not set');
			return;
		}

		var keywords = encodeURIComponent(match[1]);
		request('http://api.soundcloud.com/tracks.json?client_id='+HUBOT_SOUNDCLOUD_API_KEY+'&q='+ keywords , function(err,res,body){
			if(err || res.statusCode != 200){
				msg('Error: '+ err);
				return;
			}

			var data = JSON.parse(body);
			if(data.length < 1){
				msg.send('SoundCloud: nothing found for '+ match[1]);
				return;
			}

			msg.send(data[0].permalink_url.replace('http','https'));
		});
	});
};
