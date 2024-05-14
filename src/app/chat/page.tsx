"use client";

import { Chat, LoadingIndicator } from "stream-chat-react";
import useInitializeChatClient from "./useInitializeChatClient";
import { useUser } from "@clerk/nextjs";
import ChatSidebar from "./ChatSidebar";
import ChatChannel from "./ChatChannel";

const ChatPage = () => {
  const chatClient = useInitializeChatClient();
  const { user } = useUser();

  if (!chatClient || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingIndicator size={40} />
      </div>
    );
  }
  return (
    <div className="h-screen">
      <Chat client={chatClient}>
        <div className="flex h-full flex-row">
          <ChatSidebar user={user} show={true} />
          <ChatChannel show={false} />
        </div>
      </Chat>
    </div>
  );
};

export default ChatPage;
