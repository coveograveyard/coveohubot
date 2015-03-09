// Description:
//   Display a link to TP
//
// Commands:
//   !tp <number> : shows link to tp <number>
//
// Author:
//   pastjean
//   olamothe
//   guisim

var guidPattern = /[0-9a-fA-F]{8}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{12}/i;

module.exports = function(robot){
  // a token looks like this : 12a3b4cd-5ef6-7a89-b012-345c678901de
  robot.hear(/^!tp( [0-9a-zA-Z])+/i,function(msg){
    msg.send('http://targetprocess/entity/' + msg.match[1]);
  });
};
