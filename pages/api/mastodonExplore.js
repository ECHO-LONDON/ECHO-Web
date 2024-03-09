import axios from 'axios';
import { getRelevantContent } from '@/utils/openai'

export default async function handler(req, res) {

  try {
    const { MASTODON_ACCESS_TOKEN, MASTODON_API_URL } = process.env;

    let posts = [];
    for (let offset = 0; offset < 60; offset += 20) {
      const response = await axios.get(`${MASTODON_API_URL}/trends/statuses?limit=20&offset=${offset}`);
      posts = posts.concat(response.data);
    }

    const postsContent = posts.map((post, index) => {
      return {
        id: index,
        content: post.content
      }
    });

    const theme = req.query.theme;

    if (!theme) {
      return res.status(200).json(posts);
    }

    const relevantContent = await getRelevantContent(theme, postsContent);
    const relevantPosts = relevantContent.relevant_posts.map(post => posts[post.id]);

    return res.status(200).json(relevantPosts);
  } catch (error) {
    console.error('Mastodon API search error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
