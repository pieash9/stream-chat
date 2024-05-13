import { UserButton } from "@clerk/nextjs";

const ChatPage = () => {
  return (
    <div>
      ChatPage <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default ChatPage;
