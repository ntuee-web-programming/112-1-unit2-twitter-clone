import { MessageCircle, Repeat2, Heart, Share } from "lucide-react";

import { Separator } from "@/components/ui/separator";

export default function Tweet() {
  return (
    <>
      <div className="w-full px-4 pt-3">
        <div className="flex gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/750.jpg"
            alt="avatar"
            className="h-12 w-12 rounded-full"
          />
          <article className="flex flex-col">
            <p className="font-bold">
              Larry the Bird{" "}
              <span className="font-normal text-gray-400">@larry</span>
              <span className="font-normal text-gray-400"> · </span>
              <span className="font-normal text-gray-400">1h</span>
            </p>
            <p>
              Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
              sint cillum sint consectetur cupidatat.
            </p>
            <div className="my-3 flex items-center justify-between gap-4 text-gray-400">
              <button>
                <MessageCircle size={20} className="-scale-x-100" />
              </button>
              <button>
                <Repeat2 size={22} />
              </button>
              <button>
                <Heart size={18} />
              </button>
              <button>
                <Share size={18} />
              </button>
            </div>
          </article>
        </div>
      </div>
      <Separator />
    </>
  );
}
