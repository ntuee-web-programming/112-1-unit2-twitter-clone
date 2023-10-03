"use client";

import { MoreHorizontal } from "lucide-react";

import UserAvatar from "@/components/UserAvatar";
import useUserInfo from "@/hooks/useUserInfo";

export default function ProfileButton() {
  const { username, handle } = useUserInfo();

  return (
    <button className="flex items-center gap-2 rounded-full p-3 text-start transition-colors duration-300 hover:bg-gray-200">
      <UserAvatar />
      <div className="w-40 max-lg:hidden">
        <p className="text-sm font-bold">{username ?? "..."}</p>
        <p className="text-sm text-gray-500">{`@${handle}`}</p>
      </div>
      <MoreHorizontal size={24} className="max-lg:hidden" />
    </button>
  );
}
