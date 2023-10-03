"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { faker } from "@faker-js/faker";
import { MoreHorizontal } from "lucide-react";

import avatar from "@/assets/avatar.png";

export default function ProfileButton() {
  const [username, setUsername] = useState<null | string>(null);
  const [handle, setHandle] = useState<null | string>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const newUsername = searchParams.get("username");
    setUsername(newUsername);
    const [firstName, lastName] = newUsername?.split(" ") ?? [];
    // for reproducibility
    faker.seed(42069);
    // generate a handle based on the username
    setHandle(
      faker.internet.userName({
        firstName,
        lastName,
      }),
    );
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
