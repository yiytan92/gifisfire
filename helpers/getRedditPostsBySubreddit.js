const request = require ('request')
const db = require('../database')


let getRedditData = (subreddit) => {


  let options = {
    url: 'https://www.reddit.com/r/gifs/hot/.json?limit=900',
    method: 'GET'
  };

  var getSubreddits = function (err,res,body){
    if(err){
      console.log('error' , err);
    }
    let json = JSON.parse(body);
    // console.log('json ', json)
    // console.log('this should be ifv ', json.data.children[0].data.url.slice(json.data.children[0].data.url.length-3))

    json.data.children.forEach(function(post){
      //check if post is gif
      if(post.data.url.slice(post.data.url.length-3) === 'ifv'){
        db.Gif.create({
          url: post.data.url,
          score: post.data.score,
          title: post.data.title,
          permalink: post.data.permalink,
          seen: false
        })
      }
    });
  }

  request(options,getSubreddits);

  }

module.exports.getRedditData = getRedditData;
