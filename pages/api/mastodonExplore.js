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

    // from hashtag
    const theme = req.query.theme;

    if (!theme) {
      return res.status(200).json(posts);
    }
    
    let postsContent = posts.map((post, index) => {
      return {
        id: index,
        content: post.content
      }
    });

    let relevantContent = await getRelevantContent(theme, postsContent);
    let relevantPosts = relevantContent.relevant_posts.map(post => posts[post.id]);

    posts = [];
    const tags = theme.split(',');
    for (let tag of tags) {
      const response = await axios.get(`${MASTODON_API_URL}/timelines/tag/${tag}`);
      posts = posts.concat(response.data);
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.error('Mastodon API search error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
