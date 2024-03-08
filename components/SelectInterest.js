const SelectInterest = ({ interests, selectedInterests, onInterestToggle }) => {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {interests.map(interest => (
        <button
          key={interest}
          onClick={() => onInterestToggle(interest)}
          className={`border rounded px-4 py-2 ${
            selectedInterests.includes(interest) ? 'bg-blue-500 text-white' : 'bg-white text-black'
          }`}
        >
          {interest}
        </button>
      ))}
    </div>
  );
}

export { SelectInterest }