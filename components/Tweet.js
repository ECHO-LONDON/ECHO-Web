const Tweet = ({ tweet }) => {
  return (
    <div className="border-b border-gray-200 p-4">
      <h5 className="font-bold">{tweet.author}</h5>
      <p dangerouslySetInnerHTML={{ __html: tweet.content }} />
    </div>
  );
}

export { Tweet }