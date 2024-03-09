import Image from 'next/image';

const RedditPost = ({ post }) => {
  return (
    <div className="m-4 max-w-md bg-gray-700 border border-gray-200 rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <div className="font-bold text-xl mb-2">{post.title}</div>
        <p>{post.content}</p>
      </div>
      {(post.image.includes(".jpg") || post.image.includes(".png")) || post.image.includes(".jpeg") ?
        <div className="mt-2">
          <Image
            src={post.image}
            width={0}
            height={0}
            sizes="90vh"
            className="mx-auto max-w-full h-auto"
            style={{ width: '90vh', height: 'auto' }}
            alt="Reddit Post Image"
          />
        </div> : <></>
      }
      <div className="flex items-center justify-between p-4 border-t">
        {
          post.votes >= 0 ?
            <span className="text-green-500">↑ {post.votes}</span> :
            <span className="text-red-500">↓ {post.votes}</span>
        }
        <div className="text-sm text-gray-400 mt-2">
          Source: Reddit
        </div>
      </div>
    </div>
  );
};

export { RedditPost };