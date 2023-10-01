"use client";

// since we use client-side features like onInput and onChange,
// we need to set this to client component
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

type GrowingTextareaProps = {
  wrapperClassName?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

// this component implements a css hack that allows the textarea to grow with its content
// I will not explain how it works here, if you are interested, please refer to the following link
// https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/

// forwardRef is used here because we want this component to behave as a normal textarea
// so that we can use it in the same way as a normal textarea
// for more information, please refer to the following link
// https://react.dev/reference/react/forwardRef
const GrowingTextarea = forwardRef<HTMLTextAreaElement, GrowingTextareaProps>(
  ({ className, wrapperClassName, placeholder, value, onChange }, ref) => {
    return (
      <div
        className={cn(
          wrapperClassName,
          "grid",
          // advanced tailwindcss may seem intimidating, but you can see the expanded css on hover
          // if you have the tailwindcss extension installed
          // css can do powerful things, even read the value of an attribute
          // learn more about css functions here: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions#reference_functions
          // after: adds a pseudo element after the element and style it
          // learn more about pseudo elements here: https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements
          // you may not think this is useful, but it is actually very useful for styling custom components and cool hacks
          "after:invisible after:whitespace-pre after:content-[attr(data-replicated-value)]",
          "after:col-span-1 after:col-start-1 after:row-span-1 after:row-start-1",
        )}
      >
        <textarea
          className={cn(
            className,
            "resize-none overflow-hidden",
            "col-span-1 col-start-1 row-span-1 row-start-1",
          )}
          placeholder={placeholder}
          value={value}
          onInput={(e) => {
            const target = e.target;
            if (!(target instanceof HTMLTextAreaElement)) return;
            // this element always has a parent, so the non-null assertion is safe
            const parent = target.parentElement!;
            parent.dataset.replicatedValue = target.value + " ";
          }}
          onChange={(e) => onChange?.(e.target.value)}
          ref={ref}
        ></textarea>
      </div>
    );
  },
);

// this name is used by react devtools to identify this component
GrowingTextarea.displayName = "GrowingTextarea";

export default GrowingTextarea;
