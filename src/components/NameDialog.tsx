"use client";

import { useEffect, useRef, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

// all components is src/components/ui are lifted from shadcn/ui
// this is a good set of components built on top of tailwindcss
// see how to use it here: https://ui.shadcn.com/
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
import { cn, validateHandle, validateUsername } from "@/lib/utils";

export default function NameDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const handleInputRef = useRef<HTMLInputElement>(null);
  const [usernameError, setUsernameError] = useState(false);
  const [handleError, setHandleError] = useState(false);

  // check if the username and handle are valid when the component mounts
  // only show the dialog if the username or handle is invalid
  useEffect(() => {
    const username = searchParams.get("username");
    const handle = searchParams.get("handle");
    // if any of the username or handle is not valid, open the dialog
    setDialogOpen(!validateUsername(username) || !validateHandle(handle));
  }, [searchParams]);

  // handleSave modifies the query params to set the username and handle
  // we get from the input fields. src/app/page.tsx will read the query params
  // and insert the user into the database.
  const handleSave = () => {
    const username = usernameInputRef.current?.value;
    const handle = handleInputRef.current?.value;

    const newUsernameError = !validateUsername(username);
    setUsernameError(newUsernameError);
    const newHandleError = !validateHandle(handle);
    setHandleError(newHandleError);

    if (newUsernameError || newHandleError) {
      return false;
    }

    // when navigating to the same page with different query params, we need to
    // preserve the pathname, so we need to manually construct the url
    // we can use the URLSearchParams api to construct the query string
    // We have to pass in the current query params so that we can preserve the
    // other query params. We can't set new query params directly because the
    // searchParams object returned by useSearchParams is read-only.
    const params = new URLSearchParams(searchParams);
    // validateUsername and validateHandle would return false if the input is
    // invalid, so we can safely use the values here and assert that they are
    // not null or undefined.
    params.set("username", username!);
    params.set("handle", handle!);
    router.push(`${pathname}?${params.toString()}`);
    setDialogOpen(false);

    return true;
  };

  // You might notice that the dialog doesn't close when you click outside of
  // it. This is beacuse we perform some validation when the dialog closes.
  // If you pass `setDialogOpen` directly to the Dialog component, it will
  // behave like a normal dialog and close when you click outside of it.
  //
  // The Dialog component calls onOpenChange when the dialog wants to open or
  // close itself. We can perform some checks here to prevent the dialog from
  // closing if the input is invalid.
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setDialogOpen(true);
    } else {
      // If handleSave returns false, it means that the input is invalid, so we
      // don't want to close the dialog
      handleSave() && setDialogOpen(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
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
              placeholder="Web Programming"
              defaultValue={searchParams.get("username") ?? ""}
              className={cn(usernameError && "border-red-500", "col-span-3")}
              ref={usernameInputRef}
            />
            {usernameError && (
              <p className="col-span-3 col-start-2 text-xs text-red-500">
                Invalid username, use only{" "}
                <span className="font-mono">[a-z0-9 ]</span>, must be between 1
                and 50 characters long.
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Handle
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <span>@</span>
              <Input
                placeholder="web.prog"
                defaultValue={searchParams.get("handle") ?? ""}
                className={cn(handleError && "border-red-500")}
                ref={handleInputRef}
              />
            </div>
            {handleError && (
              <p className="col-span-3 col-start-2 text-xs text-red-500">
                Invalid handle, use only{" "}
                <span className="font-mono">[a-z0-9\._-]</span>, must be between
                1 and 25 characters long.
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>start</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
