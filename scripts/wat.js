// Description:
//   hubot agrees that you are confused
//
// Commands:
//   !wat - Pokemon confusion
//
// Author:
//   olamothe
//   guisim
//   pastjean

module.exports = function(robot){
  robot.hear('!wat',function(msg){
    msg.send('_'+msg.message.user.name+' hurts itself in its confusion!_');
  });
};
