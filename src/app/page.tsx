import Image from "next/image";

import { ChevronDown } from "lucide-react";

import avatar from "@/assets/avatar.png";
import GrowingTextarea from "@/components/GrowingTextarea";
import NameDialog from "@/components/NameDialog";
import Tweet from "@/components/Tweet";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <div className="flex w-full max-w-2xl flex-col pt-2">
        <h1 className="mb-2 px-4 text-xl font-bold">Home</h1>
        <Separator />
        <>
          <div className="w-full px-4 pt-3">
            <div className="flex gap-4">
              <Image
                src={avatar}
                alt="madmaxieee"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full"
              />
              <div className="flex w-full flex-col px-2">
                <button className="text-brand flex w-fit items-center rounded-full border-[1px] border-gray-300 px-2 text-sm font-bold">
                  Everyone
                  <ChevronDown size={16} className="text-gray-300" />
                </button>
                <GrowingTextarea
                  wrapperClassName="mt-6 mb-2"
                  className="bg-transparent outline-none placeholder:text-gray-500"
                  placeholder="What's happening?"
                ></GrowingTextarea>
                <Separator />
                <div className="flex justify-end">
                  <button className="bg-brand hover:bg-brand/70 my-2 rounded-full px-4 py-2 text-white transition-colors">
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Separator />
        </>
        <Tweet />
      </div>
      <NameDialog />
    </>
  );
}
