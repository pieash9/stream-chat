"use client";

import { StreamChat } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

const ChatPage = () => {
  return (
    <div>
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
