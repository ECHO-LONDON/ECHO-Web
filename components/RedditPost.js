import Image from 'next/image';
import { Dropdown } from "./Dropdown";
import { useState } from 'react';

const RedditPost = ({ post, handleFeedback }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);

  return (
    <div className="m-4 p-4 max-w-md bg-gradient-to-b from-teal-400 to-sky-800 border border-gray-200 rounded-xl shadow-md overflow-hidden">
      <div className="relative">
        <button onClick={toggleDropdown} className="p-2 rounded-full absolute right-0">
          <span className="text-white">⋮</span> {/* Three dots icon */}
        </button>
        {isDropdownVisible && (
          <Dropdown onClick={(e) => {
            toggleDropdown();
            handleFeedback(e)
          }} isVisible={isDropdownVisible} />
        )}
      </div>
      <div className="p-4">
        <div className="font-bold text-xl mb-2">{post.title}</div>
        <p>{post.content}</p>
      </div>
      {(post.image.includes(".jpg") || post.image.includes(".png")) || post.image.includes(".jpeg") || post.image.includes(".gif") || post.image.includes(".webp") ?
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
      {
        post.video ? <div className="mt-2">
          <video
            src={post.video}
            width="100%"
            controls
            className="mx-auto max-w-full h-auto"
          />
        </div> : <></>
      }
      <div className="flex items-center justify-between p-4 border-t">
        {
          post.votes >= 0 ?
            <span className="text-green-500">↑ {post.votes}</span> :
            <span className="text-red-500">↓ {post.votes}</span>
        }
        <div className="text-sm text-gray-100 mt-2">
          Source: Reddit
        </div>
      </div>
    </div>
  );
};

export { RedditPost };