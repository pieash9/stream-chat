import { useEffect, useState } from "react";
import {
  Avatar,
  useChatContext,
  LoadingChannels as LoadingUsers,
} from "stream-chat-react";
import type { UserResource } from "@clerk/types";
import { Channel, UserResponse } from "stream-chat";
import { ArrowLeft } from "lucide-react";
import LoadingButton from "@/components/LoadingButton";

interface UsersMenuProps {
  loggedInUser: UserResource;
  onClose: () => void;
  onChannelSelected: () => void;
}

const UsersMenu = ({
  loggedInUser,
  onClose,
  onChannelSelected,
}: UsersMenuProps) => {
  const { client, setActiveChannel } = useChatContext();
  const [users, setUsers] = useState<(UserResponse & { image?: string })[]>();
  const [moreUsersLoading, setMoreUsersLoading] = useState(false);
  const [endOfPaginationReached, setEndOfPaginationReached] =
    useState<boolean>();

  const pageSize = 2;

  useEffect(() => {
    async function loadInitialUsers() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const response = await client.queryUsers(
          {
            id: { $ne: loggedInUser.id },
          },
          {
            id: 1,
          },
          { limit: pageSize + 1 },
        );
        setUsers(response.users.slice(0, pageSize));
        setEndOfPaginationReached(response.users.length <= pageSize);
      } catch (error) {
        console.log(error);
        alert("Error loading users");
      }
    }
    loadInitialUsers();
  }, [client, loggedInUser.id]);

  const handleChannelSelected = (channel: Channel) => {
    setActiveChannel(channel);
    onChannelSelected();
  };

  const startChatWithUser = async (userId: string) => {
    try {
      const channel = client.channel("messaging", {
        members: [loggedInUser.id, userId],
      });
      await channel.create();
      handleChannelSelected(channel);
    } catch (error) {
      console.error(error);
      alert("Error creating channel");
    }
  };

  return (
    <div className="str-chat absolute z-10 size-full border-e border-e-[#DBDDE1] bg-white">
      <div className="flex items-center gap-3 p-3 text-lg font-bold">
        <ArrowLeft onClick={onClose} className="cursor-pointer" /> Users
      </div>
      <div>
        {!users && <LoadingUsers />}
        {users?.map((user) => (
          <UserResult
            key={user.id}
            user={user}
            userClicked={startChatWithUser}
          />
        ))}
        {endOfPaginationReached === false && (
          <LoadingButton
            className="m-auto mb-3 w-[80%]"
            loading={moreUsersLoading}
          >
            Load More Users
          </LoadingButton>
        )}
      </div>
    </div>
  );
};

export default UsersMenu;

interface UserResultProps {
  user: UserResponse & { image?: string };
  userClicked: (userId: string) => void;
}

const UserResult = ({ user, userClicked }: UserResultProps) => {
  return (
    <button
      className="hover: mb-3 flex w-full items-center gap-2 p-2 hover:bg-[#e9eaed]"
      onClick={() => userClicked(user.id)}
    >
      <span>
        <Avatar image={user.image} name={user.name || user.id} size={40} />
      </span>
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {user.name || user.id}
      </span>
      {user.online && <span className="text-green-500">Online</span>}
    </button>
  );
};
