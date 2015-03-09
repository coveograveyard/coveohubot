// Description:
//   Responds to '/logentries' hook
//
var request = require('request');

module.exports = function(robot){
  robot.router.post('/logentries',function(req,resp){
    var payload = JSON.parse(req.body.payload);

    var log = {
      environment: payload.host.name,
      event: payload.event.m,
      time: new Date(payload.event.t).toISOString()
    };
    var channel = req.query.channel;

    request({
        uri: 'https://coveo.slack.com/services/hooks/incoming-webhook?token=P4f2kjQGCnUQqKVLcaX9iiHA',
        method: 'POST',
        json: {
            "fallback": "Logentries Alert ["+ log.environment +"] | " + log.event,
            "color": "#CC0000",
            "fields": [{
                "title": "Logentries Alert",
                "value": log.event,
                "short": false
            }, {
                "title": "Time",
                "value": log.time,
                "short": true
            }, {
                "title": "Environment",
                "value": log.environment,
                "short": true
            }],
            "channel": "#"+ channel,
            "username": "Logentries",
            "icon_url": "https://az495088.vo.msecnd.net/app-logo/logentries_215.png"
        }
    },

    function(error, response, body) {
        if (!error && response.statusCode == 200) {
            robot.logger.info(body);
        } else {
            robot.logger.info(error, response, body);
        }
    });
    // (... whats the log and whats the channel)
  });
};
