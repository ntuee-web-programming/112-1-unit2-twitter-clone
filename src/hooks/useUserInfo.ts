import { useEffect, useMemo, useState } from "react";

import { useSearchParams } from "next/navigation";

import { getAvatar, getHandle } from "@/lib/utils";

export default function useUserInfo() {
  const searchParams = useSearchParams();
  const [username, setUsername] = useState<null | string>(null);

  const avatarURL = useMemo(() => getAvatar(username), [username]);
  const handle = useMemo(() => getHandle(username), [username]);

  useEffect(() => {
    // set username and handle from search params in useEffect since this only works in the browser
    const newUsername = searchParams.get("username");
    setUsername(newUsername);
  }, [searchParams]);

  return {
    username,
    handle,
    avatarURL,
  };
}
