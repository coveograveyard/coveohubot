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
var Feed = require('feed');

module.exports = function(robot){
	robot.router.get('/rss', function(req, res){
		var queryString = [];
		for(var key in req.query){
			queryString.push(encodeURIComponent(key)+'='+encodeURIComponent(req.query[key]));
		}
		 robot.http("https://cloudplatform.coveo.com/rest/search?"+queryString.join('&'))
		    .get()(function(err, res2, body){
				if(res2.statusCode != 200){
					return res.status(res2.statusCode).send(body)
				}
				var feed = new Feed({
				    title:          'Coveo Results',
				    description:    'Coveo results feed',
				    link:           'http://coveo.com',
				    image:          'https://pbs.twimg.com/profile_images/482171470064275456/PFk2GlAV_400x400.png',
				    copyright:      'All rights reserved 2015, Coveo',
				    
				    author: {
				        name:       'Apare',
				        email:      'apare@coveo.com',
				        link:       'http://coveo.com'
				    }
				});
				var response = JSON.parse(body);
				for(var key in response.results) {
					var result = response.results[key];
				    feed.addItem({
				        title:          result.title,
				        link:           result.clickUri,
				        description:    result.excerpt,
				        author: [
				            {
				                name:   result.raw.sysauthor
				            }
				        ],
				        content:  result.excerpt,
				        date:           new Date(result.raw.sysdate)
				    });
				}
				return res.type('text/xml').send(feed.render('rss-2.0'));
		    })
	})
}

    