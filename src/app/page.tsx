import Tweet from "@/components/Tweet";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col pt-2">
        <h1 className="mb-2 px-4 text-xl font-bold">Home</h1>
        <Separator />
        <Tweet />
      </div>
    </>
  );
}
