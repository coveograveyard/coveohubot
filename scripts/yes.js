// Description:
//   hubot agrees with you
//
// Commands:
//   !yes - hubot agress with you
//
// Author:
//   olamothe
//   guisim
//   pastjean

module.exports = function(robot){
  robot.hear('!yes',function(msg){
    msg.send('Good point,' + msg.message.user.name)
  });
}
