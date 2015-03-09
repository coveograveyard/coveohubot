// Description:
//   hubot does sentiment analysis
//
// Commands:
//   hubot analyze( me)? <text> - Displays an emoji according to the emotion of the <text>
//
// Author:
//   pastjean
//   wfortin
//   guisim
var request = require('request');
var sentiment = require('sentiment');


module.exports= function(robot){
  robot.respond(/analyze( me)? (.*)/i,function(msg){
    var result = sentiment(msg.match[2]);

    // order is important
    var emotion = ':neutral_face:';
    emotion = result.score >  0 ? ':smiley:' : emotion;
    emotion = result.score >  2 ? ':grin:' : emotion;
    emotion = result.score <  0 ? ':disappointed:' : emotion;
    emotion = result.score < -2 ?  ':cry:' : emotion;

    msg.send(emotion);
  });
};
