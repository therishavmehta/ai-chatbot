"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import clsx from "clsx";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={clsx(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    {/* Track */}
    <SliderPrimitive.Track
      className={clsx(
        "relative h-1 w-full grow overflow-hidden rounded-full",
        "bg-secondary",
        "disabled:bg-secondary/50"
      )}
    >
      {/* Range */}
      <SliderPrimitive.Range
        className={clsx(
          "absolute h-full bg-blue-500 dark:bg-blue-300", // Visible range color
          "transition-all"
        )}
      />
    </SliderPrimitive.Track>
    {/* Thumb */}
    <SliderPrimitive.Thumb
      className={clsx(
        "block h-4 w-4 rounded-full bg-white", // Solid circle thumb
        "shadow-lg transition-transform focus-visible:outline-none",
        "hover:scale-110 focus-visible:scale-110", // Add interaction feedback
        "disabled:pointer-events-none disabled:opacity-50"
      )}
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
