import Image from "next/image";
import Link from "next/link";

import {
  Bell,
  Bookmark,
  FileText,
  Home,
  Mail,
  MoreHorizontal,
  Search,
  User,
  Users,
} from "lucide-react";

import Larry from "@/assets/larry.png";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    // aside is a semantic html tag for side content
    <aside className="flex min-h-screen flex-col gap-2 px-8 py-6">
      <div className="p-2">
        <Link href="/">
          <Image src={Larry} alt="Larry the bird" width={40} height={40} />
        </Link>
      </div>
      <HeaderButton Icon={Home} text="Home" active />
      <HeaderButton Icon={Search} text="Explore" />
      <HeaderButton Icon={Bell} text="Notifications" />
      <HeaderButton Icon={Mail} text="Messages" />
      <HeaderButton Icon={FileText} text="Lists" />
      <HeaderButton Icon={Bookmark} text="Bookmarks" />
      <HeaderButton Icon={Users} text="Communities" />
      <HeaderButton Icon={User} text="Profile" />
      <HeaderButton Icon={MoreHorizontal} text="More" />
      <button className="bg-brand mt-4 w-72 rounded-full py-3 text-white">
        Tweet
      </button>
    </aside>
  );
}

type HeaderButtonProps = {
  // allow size, and strokeWidth to be string to match lucide-react's size prop
  // this is basically a interface so that we can pass in custom component if we need to
  Icon: React.ComponentType<{
    size?: number | string;
    strokeWidth?: number | string;
  }>;
  text: string;
  active?: boolean;
};

function HeaderButton({ Icon, text, active }: HeaderButtonProps) {
  return (
    <Link
      href="/"
      // prefix a class with hover: to make it only apply when the element is hovered
      className="flex items-center gap-4 rounded-full p-2 pr-4 transition-all duration-300 hover:bg-gray-200"
    >
      <div className="grid h-[40px] w-[40px] place-items-center">
        <Icon
          // now that we defined the interface for Icon, we can pass in the size and strokeWidth props safely
          size={26}
          strokeWidth={active ? 3 : 2}
        />
      </div>
      <span
        // the `cn` helper function basically concatenate your tailwind classes in a safe way
        // on the surface, it will remove any falsy values from the array, it also remove any redundant classes
        // this is useful for conditional classes
        // prefixing a class with max-lg: makes it only apply to screen size below lg, this is the tailwind way of media queries
        // likewise, prefixing a class with lg: makes it only apply to screen size above lg
        // read more about tailwind responsive design here: https://tailwindcss.com/docs/responsive-design
        className={cn("text-xl max-lg:hidden", active && "font-bold")}
      >
        {text}
      </span>
    </Link>
  );
}
