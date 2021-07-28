/* eslint-disable no-undef */
const Twitter = require("twitter");

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET,
});

exports.handler = async function (
  { queryStringParameters },
  context,
  callback
) {
  try {
    const data = await client.get("statuses/home_timeline", {
      tweet_mode: "extended",
      exclude_replies: "true",
      include_rts: "true",
      since_id: queryStringParameters.since_id,
      count: "200",
    });
    callback(undefined, {
      statusCode: 200,
      body: JSON.stringify(data),
    });
  } catch (error) {
    callback(error && error.map((e) => e.message));
  }
};
