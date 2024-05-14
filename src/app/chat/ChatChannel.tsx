import {
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

interface ChatChannelProps {
  show: boolean;
}

const ChatChannel = ({ show }: ChatChannelProps) => {
  return (
    <div className={`"size-full" ${show ? "block" : "hidden"}`}>
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </div>
  );
};

export default ChatChannel;
