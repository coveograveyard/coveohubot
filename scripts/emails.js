// Description:
//   hubot does sentiment analysis
//
// Commands:
//   !email <search> : Search emails matching <search>
//
// Author:
//   pastjean
//   olamothe
//   guisim

module.exports= function(robot){
  robot.hear(/^!email (.*)/i,function(msg){
    var whattosearch = encodeURIComponent(msg.match[1]);
    msg.send("http://ces/js#q=" + whattosearch + "&t=Emails");
  });
};
