import Link from "next/link";

import { Separator } from "./ui/separator";

export default function Header() {
  return (
    <>
      <div className="container flex h-16 flex-row items-center justify-between space-y-0 py-4">
        <Link href="/">
          <h2 className="text-lg font-semibold">twitter</h2>
        </Link>
      </div>
      <Separator />
    </>
  );
}
