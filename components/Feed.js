import { Tweet } from './Tweet';

export default function Feed({ tweets }) {
  return (
    <div>
      {tweets.map(tweet => <Tweet key={tweet.id} tweet={tweet} />)}
    </div>
  );
}
