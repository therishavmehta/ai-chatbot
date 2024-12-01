"use client";
import { ChatProvider } from "../context/chat-context";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChatProvider>
      <Component {...pageProps} />
    </ChatProvider>
  );
}

export default MyApp;
