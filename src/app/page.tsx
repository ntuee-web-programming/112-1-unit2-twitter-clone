import { MessageCircle, Repeat2, Heart, Share } from "lucide-react";

import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col pt-2">
        <h1 className="mb-2 px-4 text-xl font-bold">Home</h1>
        <Separator />
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
                    <MessageCircle
                      strokeWidth={1.5}
                      size={20}
                      className="-scale-x-100"
                    />
                  </button>
                  <button>
                    <Repeat2 strokeWidth={1.5} size={22} />
                  </button>
                  <button>
                    <Heart strokeWidth={1.5} size={18} />
                  </button>
                  <button>
                    <Share strokeWidth={1.5} size={18} />
                  </button>
                </div>
              </article>
            </div>
          </div>
          <Separator />
        </>
      </div>
    </>
  );
}
