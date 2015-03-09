// Description:
//   bot says somebody is nice
//
// Commands:
//   !noice <username> - Responds with: "<you> thinks <username> is noice!"
//
// Author:
//   pastjean
//   guisim
//   olamothe

module.exports = function(robot){
  robot.hear(/^!noice (.*)/i, function(msg){
    var whoIsNice = msg.match[1];
    msg.send(msg.message.user.name + " thinks " + (whoIsNice ? whoIsNice : "gsimard") + " is noice!");
  });
};
