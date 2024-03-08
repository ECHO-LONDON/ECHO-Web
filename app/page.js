"use client";

import Image from "next/image";
import Feed from "@/components/Feed";
import { useState, useEffect } from "react";

export default function Home() {
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
      <Feed tweets={tweets} />
    </div>
  );
}
