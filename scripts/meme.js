// Description:
//   hubot does memes
//
// Commands:
//   !meme <meme>|<text0>|<text1>
//   !meme <memesearch>
//   !meme list
//
// Author:
//   apare
//   glaporte

var request = require('request');

function memeList(query, callback){
  request.get('https://api.imgflip.com/get_memes',function(err,res,body){
    var memes = JSON.parse(body).data.memes;

    var chosenMemes = memes.filter(function(meme){
      return meme.id === parseInt(meme.id) || meme.name.toLowerCase().indexOf(query.toLowerCase()) >= 0
    });

    callback(0,chosenMemes);
  });
}

function getMeme(query, callback){
  request.get('https://api.imgflip.com/get_memes',function(err,res,body){
    var memes = JSON.parse(body).data.memes;

    var chosenMeme = memes.filter(function(meme){
      return meme.id === parseInt(meme.id) || meme.name.toLowerCase().indexOf(query.toLowerCase()) >= 0
    })[0];

    callback(chosenMeme.id,chosenMeme)
  });
}

module.exports = function(robot){
  robot.hear(/^!meme (.*)/i,function(msg){
     var q = msg.match[1].split('|');

     // Do we want a list/search or a meme
     if(q.length === 3){
       // Here we want a meme
       getMeme(q[0],function(err,meme){
         var formParams = {
           template_id: meme.id,
           username: 'coveoslackbot',
           password: 'tamere',
           text0: q[1] + '',
           text1: q[2] + ''
         };
         request.post('https://api.imgflip.com/caption_image',function(err,res,body){
           var result = JSON.parse(body);
           if(result.success == true) {
             msg.reply(result.data.url);
           } else {
             msg.send('Error with the meme provider.');
           }
         }).form(formParams);
       });
     } else {
       // Here we want a list
       var search = q[0] === "list" ? "" : q[0]
       memeList(search,function(err,memes){
         msg.send(memes.map(function(meme){
           return meme.name
         }).join('\n'));
       });
     }
  });
};
