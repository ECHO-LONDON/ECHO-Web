import axios from 'axios';
import { getRelevantContent } from '@/utils/openai'

export default async function handler(req, res) {

  const token = req.body.token;

  try {
    const response = await axios.get("https://oauth.reddit.com/.json", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.status(200).json(response.data.data.children);
  } catch (error) {
    console.error('Mastodon API search error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
