const ConnectRedditButton = ({ onClick }) => {

  if (typeof window !== 'undefined' && localStorage.getItem('redditAccessToken')) {
    return (
      <div className="px-4">
        <button
          onClick={() => localStorage.removeItem('redditAccessToken')}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition ease-in duration-200"
        >
          Disconnect Reddit
        </button>
      </div>
    )
  }

  return (
    <div className="px-4">
      <button
        onClick={onClick}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition ease-in duration-200"
      >
        Connect Reddit
      </button>
    </div>
  );
};

export { ConnectRedditButton }