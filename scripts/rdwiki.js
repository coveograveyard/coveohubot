// Description:
//   hubot does search on RDWIKI
//
// Commands:
//   !rdwiki <search> : Search in rdwiki for <search>
//
// Author:
//   pastjean
//   olamothe
//   guisim
module.exports= function(robot){
  robot.hear(/^!rdwiki (.*)/i,function(msg){
    var whattosearch = encodeURIComponent(msg.match[1]);
    msg.send("http://ces/js#q=" + whattosearch + '&t=RDWIKI')
  });
};
