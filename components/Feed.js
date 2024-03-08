"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { TailSpin } from 'react-loader-spinner'

import { Tweet } from './Tweet';

const Feed = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    fetch("/api/mastodonExplore?theme=technology")
      .then((response) => response.json())
      .then((data) => {
        data = data.map((tweet) => {
          return {
            id: tweet.id,
            content: tweet.content,
            author: tweet.account.display_name,
          };
        });
        setTweets(data)
      });
  }, []);

  return (
    <div>
      {tweets.length 
      ? tweets.map(tweet => <Tweet key={tweet.id} tweet={tweet} />)
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
