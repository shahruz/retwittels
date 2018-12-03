const TwitterClient = require('./twitter');
const fs = require('fs');
const { timeKeyForTime } = require('../lib/time-keys');

const getTweetsAtTime = time => {
  let timeline = fs.readFileSync('./data/timeline.json');
  timeline = JSON.parse(timeline);
  return timeline[time];
};

const downloadTimeline = async username => {
  const tweetMap = {};
  var tweets = [];
  var timeline = [];
  var max_id;

  do {
    tweets = await TwitterClient.getTweets(username, max_id);
    tweets.map(cleanTweet).forEach(tweet => {
      if (!tweetMap[tweet.time]) tweetMap[tweet.time] = [];
      tweetMap[tweet.time].push({ id: tweet.id, text: tweet.text });
    });
    max_id = tweets.pop().id;
    timeline = [...timeline, ...tweets];
  } while (tweets.length != 0);

  fs.writeFileSync('./data/timeline.json', JSON.stringify(tweetMap, null, 2));
};

const cleanTweet = tweet => {
  return {
    id: tweet.id_str,
    text: tweet.text,
    time: timeKeyForTime(tweet.created_at)
  };
};

module.exports = { getTweetsAtTime, downloadTimeline };
