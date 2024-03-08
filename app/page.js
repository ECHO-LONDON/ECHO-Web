"use client";

import Image from "next/image";
import { Feed } from "@/components/Feed";
import { useState, useEffect } from "react";
import { TailSpin } from 'react-loader-spinner'

export default function Home() {
  return (
    <div>
      <Feed />
    </div>
  );
}
