import axios from 'axios';
const crypto = require('crypto');

export default async function handler(req, res) {
  const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
  const STATE = crypto.randomBytes(16).toString('hex');
  const REDIRECT_URI = "http://127.0.0.1:3000/redditCallback";

  return res.status(200).json({
    url: `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${STATE}&redirect_uri=${REDIRECT_URI}&duration=permanent&scope=read mysubreddits identity`
  })
}
