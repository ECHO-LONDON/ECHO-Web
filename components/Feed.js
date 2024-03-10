"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { TailSpin } from 'react-loader-spinner'

import { ProgressBar } from "./ProgressBar";
import { SelectInterest } from "./SelectInterest";
import { ConnectRedditButton } from "./ConnectRedditButton";
import { InterleavedFeed } from "./InterleavedFeed";
import Confetti from 'react-confetti'

import Swal from 'sweetalert2'


const Feed = () => {

  const [tweets, setTweets] = useState([]);
  const [redditPosts, setRedditPosts] = useState([]);

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [queriedInterests, setQueriedInterests] = useState([]);

  const [showOptions, setShowOptions] = useState(false);
  const [progress, setProgress] = useState(0);

  const interests = [
    "Technology", "Politics", "Science", "Art", "Music", "Travel"
  ];

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem('interests')) {
      window.location.href = "/onboarding";
      return;
    } else if (localStorage.getItem('interests')) {
      setSelectedInterests(JSON.parse(localStorage.getItem('interests')));
    }
  }, []);

  const handleInterestToggle = (interest) => {
    setSelectedInterests(currentInterests =>
      currentInterests.includes(interest)
        ? currentInterests.filter(i => i !== interest)
        : [...currentInterests, interest]
    );
  };

  const handleUpdateInterests = () => {
    setQueriedInterests(selectedInterests);
    localStorage.setItem('interests', JSON.stringify(selectedInterests));
    setTweets([]);
    setRedditPosts([]);
  }

  const handleConnectReddit = () => {
    fetch("/api/initRedditOauth")
      .then((response) => response.json())
      .then((data) => {
        window.location.href = data.url;
      });
  };

  const handleFeedback = (e) => {
    Swal.fire({
      title: 'Feedback',
      text: 'Thanks for your feedback!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    if (progress === 100 - 25) {
      Swal.fire({
        title: 'Congratulations!',
        text: 'You have unlocked Echo Community!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      setProgress(0);
    }
    progress < 100 && setProgress(progress + 25);
  };

  useEffect(() => {
    fetch("/api/mastodonExplore?theme=" + queriedInterests.join(","), { method: "POST" })
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

      fetch("/api/redditHome?theme=" + queriedInterests.join(",") , {
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
          setRedditPosts(currentPosts => [...currentPosts, ...data])
      });

      fetch("/api/redditExplore?theme=" + queriedInterests.join(",") , {
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
              votes: post.data.ups - post.data.downs,
              video: post.data.media?.reddit_video?.fallback_url
            };
          });
          setRedditPosts(currentPosts => [...currentPosts, ...data]);
      });
  }, [queriedInterests]);

  if (typeof window === "undefined") return null;
  const width = window.innerWidth;
  const height = window.innerHeight;

  return (
    <div>
      {
        progress === 100 &&
        <Confetti
          width={width}
          height={height}
        />
      }
      <div className="flex justify-center pt-4">
        <Image src="/logo.jpeg" alt="Logo" 
          className="w-20 h-20 rounded-full object-cover opacity-90 hover:scale-110 hover:opacity-100" width={80} height={80} 
          onClick={() => setShowOptions(!showOptions)}
        />
      </div>
      {
        showOptions &&
        <div className="text-center mt-4 bg-gray-700 p-4">
          <h1 className="text-2xl text-white font-bold">Options</h1>
          <SelectInterest interests={interests} selectedInterests={selectedInterests} onInterestToggle={handleInterestToggle} onUpdateInterests={handleUpdateInterests} />
          <ConnectRedditButton onClick={handleConnectReddit} />
        </div>
      }
      <div>
        <h1 className="text-2xl text-white font-bold text-center mt-4">🔒 COMMUNITY</h1>
        <ProgressBar progress={progress} />
      </div>
      {
        (tweets.length || redditPosts.length)
        ? <InterleavedFeed tweets={tweets} redditPosts={redditPosts} handleFeedback={handleFeedback} /> : null
      }
      {
        (!tweets.length || !redditPosts.length) ?
        <div className="flex justify-center items-center h-64">
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
      </div> : null
      }
    </div>
  );
}

export { Feed }
