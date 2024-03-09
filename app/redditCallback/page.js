"use client"

import { TailSpin } from 'react-loader-spinner'
import { useEffect } from 'react';

const RedditCallback = () => {

  useEffect(() => {
    fetch("/api/redditCallback", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code: new URLSearchParams(window.location.search).get('code') })
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('redditAccessToken', data.access_token);
        localStorage.setItem('redditRefreshToken', data.refresh_token);
        window.location.href = "/";
    });
  }, []);

  return (
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
    </div>
  );
}

export default RedditCallback