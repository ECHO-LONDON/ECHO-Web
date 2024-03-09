"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { TailSpin } from 'react-loader-spinner'

import { Tweet } from './Tweet';
import { SelectInterest } from "./SelectInterest";

const Feed = () => {
  const [tweets, setTweets] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [queriedInterests, setQueriedInterests] = useState([]);

  const interests = ['Technology', 'Politics', 'Science']

  const handleInterestToggle = (interest) => {
    setSelectedInterests(currentInterests =>
      currentInterests.includes(interest)
        ? currentInterests.filter(i => i !== interest)
        : [...currentInterests, interest]
    );
  };

  const handleUpdateInterests = () => {
    setQueriedInterests(selectedInterests);
    setTweets([]);
  }

  useEffect(() => {
    fetch("/api/mastodonExplore?theme=" + queriedInterests.join(","))
      .then((response) => response.json())
      .then((data) => {
        data = data.map((tweet) => {
          return {
            id: tweet.id,
            content: tweet.content,
            author: tweet.account.display_name,
            avatar: tweet.account.avatar,
            attachments: tweet.media_attachments.map((attachment) => {
              return {
                type: attachment.type,
                url: attachment.url,
                description: attachment.description
              };
            })
          };
        });
        setTweets(data)
      });
  }, [queriedInterests]);

  return (
    <div>
      <SelectInterest interests={interests} selectedInterests={selectedInterests} onInterestToggle={handleInterestToggle} onUpdateInterests={handleUpdateInterests} />

      {tweets.length 
      ? <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {tweets.map(tweet => (<Tweet key={tweet.id} tweet={tweet} />))}
      </div>
      : <div className="flex justify-center items-center h-64">
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>}
    </div>
  );
}

export { Feed }
