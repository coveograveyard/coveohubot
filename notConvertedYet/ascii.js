var request = require("request");

module.exports = {
  def : {
    exec : function (hook, callback) {
      if(!hook.command_text) {
        hook.command_text = hook.user_name;
      }
      var input = getInput(hook.command_text);
      var requestUri = "http://artii.herokuapp.com/make?text=" + input.text;
      if(input.font != "") {
        requestUri += "&font=" + input.font;
      }
      console.log(requestUri);
      request(requestUri, function (err, res, body) {
        if (err || res.statusCode != 200) {
          callback("Error");
        } else {
          var result = {
              text : "```" + body + "```",
              mrkdwn : true
          }
          callback(result);
        }
      });
    },
    help : function (callback) {
        callback("Display your text as ASCII. Usage !ascii @text | @font. @font is optional. Use random to get a random font. List of font available : http://artii.herokuapp.com/fonts_list.");
    }
  }
}

var list;
var randomListIndex;

request("http://artii.herokuapp.com/fonts_list" , function(err, res, body) {
  if(err || res.statusCode != 200) {
    list = [];
  } else {
    list = body.split("\n");
  }
})


var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getInput = function(input) {
  var split = input.split("|");
  var text = "";
  var font = "";
  if(split.length > 1) {
    text = split[0];
    font = split[split.length-1].trim();
    if(font == "random") {
      font = list[getRandomInt(0, list.length-1)];
    } else {
      var index = list.indexOf(font);
      if (index == -1) {
        index = 0;
      }
      font = list[index];
    }
  } else {
    text = input;
  }
  text = text.replace(/ +$/, '')
  return {text : text, font : font};
}
