// Description:
//   Shouldn't post tokens to access api in public channel
//   Bot is gonna be mad at you
//
// Author:
//   pastjean

var guidPattern = /[0-9a-fA-F]{8}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{12}/i;

module.exports = function(robot){
  // a token looks like this : 12a3b4cd-5ef6-7a89-b012-345c678901de
  robot.hear(guidPattern,function(msg){
    msg.send("Hey! don't post tokens in here");
  });
};
