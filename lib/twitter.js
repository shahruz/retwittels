require('dotenv').config();
const Twitter = require('twitter');
const TwitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const getTweets = async (username, max_id) => {
  const opts = {
    screen_name: username,
    count: 200,
    trim_user: true,
    exclude_replies: true,
    include_rts: false,
    max_id: max_id
  };
  const tweets = await TwitterClient.get('statuses/user_timeline', opts);
  return Promise.resolve(tweets);
};

const retweet = async tweetID => {
  return await client.post('statuses/retweet/' + tweetID + '.json');
};

module.exports = {
  getTweets,
  retweet
};
