import { UserButton } from "@clerk/nextjs";
import { Users } from "lucide-react";

interface MenubarProps {
  onUserMenuClick: () => void;
}

const Menubar = ({ onUserMenuClick }: MenubarProps) => {
  return (
    <div className="flex items-center justify-between gap-3 border-e border-e-[#DBDDE1] bg-white p-3">
      <UserButton afterSignOutUrl="/" />
      <span title="Show users" className="flex gap-6">
        <Users className="cursor-pointer" onClick={onUserMenuClick} />
      </span>
    </div>
  );
};

export default Menubar;
