const ProgressBar = ({ progress }) => {
  const gradientStyle = {
    width: `${progress}%`,
    backgroundImage: 'linear-gradient(to right, #FFB400, #FF0000)',
  };

  return (
    <div className="mx-auto w-1/2 my-5 h-6 bg-gray-200 rounded-full overflow-hidden">
      <div style={gradientStyle} className="h-full rounded-full"></div>
    </div>
  );
};

export { ProgressBar };