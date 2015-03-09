// Description:
//   hubot search in wikipedia
//
// Commands:
//   !wiki <search> - Search in wikipedia <search>
//
// Author:
//   pastjean
//   olamothe
//   guisim

var request = require("request");

module.exports = function(robot){
  robot.hear(/^!wiki (.*)/i,function(msg){

    var search = encodeURIComponent(match[1]);
    request('http://en.wikipedia.org/w/api.php?format=json&action=opensearch&limit=2&format=json&search='+ search, function(err,res,body){
      if(err){
        msg.send('Error: ' +err);
        return;
      }
      var result = JSON.parse(body)[1][0];
      if(result){
        msg.send('https://en.wikipedia.org/wiki/' + encodeURIComponent(result));
      }else{
        msg.send('No wiki article on ' + match[1]);
      }

    });
  });
};
