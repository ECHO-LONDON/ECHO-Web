function Dropdown({ isVisible, onClick }) {
  if (!isVisible) return null;

  return (
    <div className="origin-top-right my-1 absolute top-10 right-0 w-36 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none z-10" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      <ul>
        <li onClick={onClick} className="px-4 py-2 bg-red-700 cursor-pointer hover:bg-red-900 rounded-t-md">Not relevant</li>
        <li onClick={onClick} className="px-4 py-2 bg-green-700 cursor-pointer hover:bg-green-900 rounded-b-md">Relevant</li>
      </ul>
    </div>
  );
}

export { Dropdown }