import { RedditPost } from "./RedditPost";
import { Tweet } from "./Tweet";
import Swal from 'sweetalert2'

const InterleavedFeed = ({tweets, redditPosts}) => {
  
  const handleFeedback = (e) => {
    console.log(e.target.innerText);
    Swal.fire({
      title: 'Feedback',
      text: 'Thanks for your feedback!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

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
          <Tweet key={`tweet-${index}`} tweet={item.data} handleFeedback={handleFeedback} />
        ) : (
          <RedditPost key={`reddit-${index}`} post={item.data} />
        )
      )}
    </div>
  );
};

export { InterleavedFeed }