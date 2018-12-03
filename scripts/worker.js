const Timeline = require('../lib/timeline');
const Twitter = require('../lib/twitter');
const { currentTimeKey } = require('../lib/time-keys');
const schedule = require('node-schedule');

const run = async () => {
  const timeKey = currentTimeKey();
  const tweets = Timeline.getTweetsAtTime(timeKey);
  if (tweets) tweets.forEach(tweet => Twitter.retweet(tweet.id));
};

schedule.scheduleJob('* * * * *', run);

// required for zeit/now
require('http')
  .createServer()
  .listen(3000);
