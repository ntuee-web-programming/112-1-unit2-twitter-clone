import Image from "next/image";
import Link from "next/link";

import Larry from "@/assets/larry.png";

export default function Header() {
  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-6">
      <Link href="/">
        <Image src={Larry} alt="Larry the bird" width={40} height={40} />
      </Link>
    </div>
  );
}
