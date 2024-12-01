"use client";

import React, { useEffect, useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import { clsx } from "clsx"; // Optional for combining classNames

export interface IFCParams {
  title: string;
  description: string;
  open: boolean;
}

interface ThemedToastProps {
  open: boolean;
  setOpen: (value: IFCParams) => void;
  title: string;
  description: string;
}

const ThemedToast = ({
  open,
  setOpen,
  title,
  description,
}: ThemedToastProps) => {
  const [] = useState(false);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen({ title: "", description: "", open: false }); // Close the toast after 3 seconds
      }, 3000); // Set the time in milliseconds (3000ms = 3 seconds)

      return () => clearTimeout(timer); // Cleanup timer on component unmount or toast close
    }
  }, [open]);

  return (
    <>
      {/* Toast Provider */}
      <Toast.Provider swipeDirection="right">
        {/* Toast Root */}
        <Toast.Root
          open={open}
          onOpenChange={setOpen.bind(
            {},
            { title: "", description: "", open: false }
          )}
          className={clsx(
            "bg-gray-900 text-white shadow-lg rounded-lg p-4",
            "border border-gray-700",
            "transition-transform transform",
            "data-[state=open]:animate-toast-slide-in data-[state=closed]:animate-toast-slide-out"
          )}
        >
          {/* Toast Title */}
          <Toast.Title className="text-lg font-semibold">{title}</Toast.Title>
          {/* Toast Description */}
          <Toast.Description className="mt-2 text-sm">
            {description}
          </Toast.Description>
          {/* Close Button */}
          <Toast.Close
            className="absolute top-2 right-2 text-white hover:text-gray-400"
            aria-label="Close"
          >
            ✕
          </Toast.Close>
        </Toast.Root>

        {/* Toast Viewport */}
        <Toast.Viewport className="fixed bottom-4 right-4 flex flex-col gap-4 p-4 w-[320px] max-w-full z-50" />
      </Toast.Provider>
    </>
  );
};

export default ThemedToast;
