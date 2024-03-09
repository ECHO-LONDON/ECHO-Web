const SelectInterest = ({ interests, selectedInterests, onInterestToggle, onUpdateInterests }) => {
  return (
    <div className="flex flex-wrap gap-2 p-4 justify-center">
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
      <button onClick={() => onUpdateInterests()} className="border rounded px-4 py-2 bg-blue-500 text-white">Update Interests</button>
    </div>
  );
}

export { SelectInterest }