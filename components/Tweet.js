import Image from "next/image";

const Tweet = ({ tweet }) => {
  return (
    <div className="flex gap-4 p-4 border border-gray-200 rounded-lg m-4 bg-gray-700 overflow-hidden">
      <Image
        src={tweet.avatar}
        alt="Avatar"
        className="w-10 h-10 rounded-full"
        width={40}
        height={40}
      />
      <div className="flex-1 min-w-0">
        <h5 className="font-bold">{tweet.author}</h5>
        <p className="whitespace-pre-wrap break-words" dangerouslySetInnerHTML={{ __html: tweet.content }} />
        {tweet.attachments.map((attachment, index) => (
          <div key={index} className="mt-2">
            {attachment.type === "image" && (
              <Image 
                src={attachment.url} 
                width={0}
                height={0}
                sizes="90%"
                className="mx-auto max-w-full h-auto"
                style={{ width: '90%', height: 'auto' }} // optional
                alt={attachment.description}
              />
            )}
          </div>
        ))}
        <div className="text-sm text-gray-500 mt-2">
          Source: Mastodon
        </div>
      </div>
    </div>
  );
}

export { Tweet }