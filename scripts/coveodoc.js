// Description:
//   hubot does sentiment analysis
//
// Commands:
//   !coveodoc <text> : search on developpers.coveo.com
//
// Author:
//   pastjean
//   olamothe
//   guisim
module.exports= function(robot){
  robot.hear(/^!coveodoc (.*)/i,function(msg){
    var whattosearch = encodeURIComponent(msg.match[1]);
    msg.send("https://developers.coveo.com/dosearchsite.action#q=" + whattosearch)
  });
};
