// Description:
//   Display a Bible passage. Usage !bible @passage. (e.g. !bible John 20:30)
//
// Commands:
//   !bible @passage - Display a Bible passage (e.g. !bible John 20:30)
//
// Author:
//   pastjean
//   guisim

var request = require("request");

module.exports = function(robot){
	robot.hear(/^!bible (.*)/i,function(msg){
		var passage = encodeURIComponent(msg.match[1]);

		request("http://labs.bible.org/api/?formatting=plain&passage=" + passage, function(err,res,body){
			if (err || res.statusCode != 200) {
				msg.send("Error " + err);
				return;
			}

			if(body.length===0) {
				msg.send("No passage found.");
				return;
			}

			msg.send(body);
		});
	});
};
