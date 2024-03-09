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

    const theme = req.query.theme;
    const posts = response.data.data.children;

    if (!theme) {
      return res.status(200).json(posts);
    }

    const postsContent = posts.map((post, index) => {
      return {
        id: index,
        content: post.data.title + '\n\n' + post.data.selftext
      }
    });

    const relevantContent = await getRelevantContent(theme, postsContent);
    const relevantPosts = relevantContent.relevant_posts.map(post => posts[post.id]);

    return res.status(200).json(relevantPosts);
  } catch (error) {
    console.error('Mastodon API search error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
