import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-md border border-input bg-papier px-3.5 text-[1rem] text-anthrazit transition-[border-color,box-shadow] duration-200 placeholder:text-stein/70 hover:border-salbei focus-visible:border-moos focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-salbei/30 aria-invalid:border-fehler aria-invalid:ring-fehler/15 disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
