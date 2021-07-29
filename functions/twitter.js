const Twitter = require("twitter");

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET,
});

const getTweets = ({ since_id }) =>
  client.get("statuses/home_timeline", {
    tweet_mode: "extended",
    exclude_replies: "true",
    include_rts: "true",
    since_id,
    count: "200",
  });

exports.handler = async function ({ queryStringParameters }) {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(await getTweets(queryStringParameters)),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: Array.isArray(err)
        ? err.map((e) => e.message).join()
        : err.toString(),
    };
  }
};
