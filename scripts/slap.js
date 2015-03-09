// Description:
//   Slap someone !
//
// Commands:
//   !slap <text> - Slap someone / something
//
// Author:
//   pastjean
//   olamothe
//   guisim
module.exports = function(robot){
  robot.hear(/^!slap (.*)/i, function(msg){
    msg.send(':hand: _slaps' + match[1] +' with a large trout._ :fish:');
  });
};
