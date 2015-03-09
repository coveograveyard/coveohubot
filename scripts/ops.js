// Description:
//   hubot does sentiment analysis
//
// Commands:
//   !ops <text> : Send mail to cloudops@coveo.com
//
// Author:
//   pastjean
//   marcantoineveilleux
//   guisim
var postmark = require('postmark');
var HUBOT_POSTMARK_API_KEY = process.env.HUBOT_POSTMARK_API_KEY;

module.exports = function(robot){
	if(!HUBOT_POSTMARK_API_KEY){
		robot.logger.error('HUBOT_POSTMARK_API_KEY not set');
	}

	robot.hear(/!ops (.*)/i,function(msg){
		if(!HUBOT_POSTMARK_API_KEY){
			msg.send('HUBOT_POSTMARK_API_KEY environment variable not set');
			return;
		}

		var client = new postmark.Client(HUBOT_POSTMARK_API_KEY);
		client.sendEmail({
			"From" : "cloudops@coveo.com",
			"To" : "cloudops@coveo.com",
			"Subject" : "[CoveoSlackBot] Request from " + msg.message.user.name,
			"TextBody" : msg
		}, function (error, success) {

			if(error){
				msg.send("Failed to send email to cloudops@coveo.com. Cause: " + error.message);
				return;
			}
			msg.send("Successfully sent email to cloudops@coveo.com.");

		});

	});
};
