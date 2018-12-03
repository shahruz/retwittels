const TwitterClient = require('./twitter');
const { timeKeyForTime } = require('../lib/time-keys');
const { readFileSync } = require('fs');
const TimelineData = JSON.parse(readFileSync('./data/timeline.json'));

const getTweetsAtTime = time => TimelineData[time];

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
