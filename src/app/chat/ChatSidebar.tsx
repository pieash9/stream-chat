import {
  ChannelList,
  ChannelPreviewMessenger,
  ChannelPreviewUIComponentProps,
} from "stream-chat-react";
import Menubar from "./Menubar";

import type { UserResource } from "@clerk/types";
import { useCallback } from "react";

interface ChatSidebarProps {
  user: UserResource;
  show: boolean;
  onClose: () => void;
}

const ChatSidebar = ({ user, show, onClose }: ChatSidebarProps) => {
  const channelPreviewCustom = useCallback(
    (props: ChannelPreviewUIComponentProps) => (
      <ChannelPreviewMessenger
        {...props}
        onSelect={() => {
          props.setActiveChannel?.(props.channel), props.watchers;
          onClose();
        }}
      />
    ),
    [onClose],
  );
  return (
    <div
      className={`w-full flex-col md:max-w-[360px] ${show ? "flex" : "hidden"}`}
    >
      <Menubar />
      <ChannelList
        filters={{
          type: "messaging",
          members: { $in: [user.id] },
        }}
        sort={{ last_message_at: -1 }}
        options={{ state: true, presence: true, limit: 10 }}
        showChannelSearch
        additionalChannelSearchProps={{
          searchForChannels: true,
          searchQueryParams: {
            channelFilters: {
              filters: {
                members: {
                  $in: [user.id],
                },
              },
            },
          },
        }}
        Preview={channelPreviewCustom}
      />
    </div>
  );
};

export default ChatSidebar;
