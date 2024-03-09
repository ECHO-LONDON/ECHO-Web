"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { TailSpin } from 'react-loader-spinner'

import { SelectInterest } from "./SelectInterest";
import { ConnectRedditButton } from "./ConnectRedditButton";
import { InterleavedFeed } from "./InterleavedFeed";

const Feed = () => {
  const [tweets, setTweets] = useState([]);
  const [redditPosts, setRedditPosts] = useState([]);

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

  const handleConnectReddit = () => {
    fetch("/api/initRedditOauth")
      .then((response) => response.json())
      .then((data) => {
        window.location.href = data.url;
      });
  };

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

      if (!localStorage.getItem('redditAccessToken')) return;

      fetch("/api/redditHome", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: localStorage.getItem('redditAccessToken') })
      })
        .then((response) => response.json())
        .then((data) => {
          data = data.map((post) => {
            return {
              subreddit: post.data.subreddit_name_prefixed,
              title: post.data.title,
              content: post.data.selftext,
              image: post.data.url,
              votes: post.data.ups - post.data.downs
            };
          });
          setRedditPosts(data);
      });
  }, [queriedInterests]);

  return (
    <div>
      <SelectInterest interests={interests} selectedInterests={selectedInterests} onInterestToggle={handleInterestToggle} onUpdateInterests={handleUpdateInterests} />
      <ConnectRedditButton onClick={handleConnectReddit} />

      {tweets.length 
      ? <InterleavedFeed tweets={tweets} redditPosts={redditPosts} />
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
