var request = require("request");

module.exports = {
	def : {
		exec : function (hook, callback) {
			var query = hook.command_text;
			var params = hook.command_text.match(/(\+([a-z]+))*$/)[0];
			query = query.substr(0, query.length - params.length);
			request("http://" + query.replace(/[^a-zA-Z0-9]+/g, "") + ".jpg.to/"+params, function (err, res, body) {
				if (err || res.statusCode != 200) {
					callback("Error " + err);
				} else {
					if (body.length < 1000) {
						callback(body.substring(body.indexOf('src=\"') + 'src=\"'.length, body.lastIndexOf('"')));
					} else {
						callback("Nothing found.");
					}
				}
			});
		},
		help : function (callback) {
			callback("Displays an image. Usage !img @image_name. You can add params by adding +param1+param2 at the end of the image_name. list of params: jpg, gif, png, face, photo, clipart, lineart, black, blue, brown, gray, green, orange, pink, purple, red, teal, white, yellow, huge, xxl, xxlarge, xl, xlarge, l, large, m, medium, s, small, xs, i, icon, r, random");
		}
	}
}
