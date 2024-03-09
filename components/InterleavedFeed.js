import { RedditPost } from "./RedditPost";
import { Tweet } from "./Tweet";

const InterleavedFeed = ({tweets, redditPosts}) => {
  const maxLength = Math.max(tweets.length, redditPosts.length);
  const combinedFeed = [];

  for (let i = 0; i < maxLength; i++) {
    if (i < tweets.length) {
      combinedFeed.push({type: 'tweet', data: tweets[i]});
    }
    if (i < redditPosts.length) {
      combinedFeed.push({type: 'reddit', data: redditPosts[i]});
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {combinedFeed.map((item, index) =>
        item.type === 'tweet' ? (
          <Tweet key={`tweet-${index}`} tweet={item.data} />
        ) : (
          <RedditPost key={`reddit-${index}`} post={item.data} />
        )
      )}
    </div>
  );
};

export { InterleavedFeed }