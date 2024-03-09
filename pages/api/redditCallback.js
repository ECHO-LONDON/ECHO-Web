import axios from 'axios';

export default async function handler(req, res) {
  const { code } = req.body

  const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
  const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
  const REDIRECT_URI = "https://london-hackathon.vercel.app/redditCallback";

  const response = await axios.post("https://www.reddit.com/api/v1/access_token", {
    grant_type: "authorization_code",
    code,
    redirect_uri: "https://london-hackathon.vercel.app/redditCallback"
  }, {
    auth: {
      username: CLIENT_ID,
      password: CLIENT_SECRET
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  return res.status(200).json(response.data);
}
