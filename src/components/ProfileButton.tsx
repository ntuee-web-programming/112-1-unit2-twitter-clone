"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { MoreHorizontal } from "lucide-react";

import avatar from "@/assets/avatar.png";
import { getHandle } from "@/lib/utils";

export default function ProfileButton() {
  const [username, setUsername] = useState<null | string>(null);
  const [handle, setHandle] = useState<null | string>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    // set username and handle from search params in useEffect since this only works in the browser
    const newUsername = searchParams.get("username");
    setUsername(newUsername);
    if (newUsername) {
      setHandle(getHandle(newUsername));
    }
  }, [searchParams]);

  return (
    <button className="flex items-center gap-2 rounded-full p-3 text-start transition-colors duration-300 hover:bg-gray-200">
      <Image
        src={avatar}
        alt="madmaxieee"
        width={48}
        height={48}
        className="rounded-full"
      />
      <div className="w-40 max-lg:hidden">
        <p className="text-sm font-bold">{username ?? "..."}</p>
        <p className="text-sm text-gray-500">{`@${handle ?? ""}`}</p>
      </div>
      <MoreHorizontal size={24} className="max-lg:hidden" />
    </button>
  );
}
