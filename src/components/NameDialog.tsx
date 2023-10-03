"use client";

import { useEffect, useRef, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NameDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const username = searchParams.get("username");
    setDialogOpen(!username);
  }, [searchParams]);

  const handleSave = () => {
    const username = inputRef.current?.value;

    if (username) {
      const params = new URLSearchParams(searchParams);
      params.set("username", username);

      router.push(`${pathname}?${params.toString()}`);
      setDialogOpen(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome to Twitter!</DialogTitle>
          <DialogDescription>
            Tell us your name to start tweeting.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Web Programming"
              className="col-span-3"
              ref={inputRef}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>start</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
