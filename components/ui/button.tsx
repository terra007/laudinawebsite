import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,color,box-shadow,transform] duration-300 ease-out disabled:pointer-events-none disabled:opacity-55 [&_svg]:pointer-events-none [&_svg]:size-[1.1em] [&_svg]:shrink-0 active:scale-[0.985]",
  {
    variants: {
      variant: {
        default:
          "bg-moos text-papier hover:bg-moos-tief hover:shadow-[0_10px_30px_-12px_rgba(82,31,31,0.65)]",
        outline: "border border-moos/35 bg-transparent text-moos hover:border-moos hover:bg-salbei-hell/60",
        light: "bg-papier text-moos-tief hover:bg-sand-hell",
        ghost: "text-moos hover:bg-salbei-hell/60",
        link: "text-link rounded-none p-0 h-auto",
      },
      size: {
        default: "h-12 px-6 text-[1rem]",
        sm: "h-10 px-4 text-[0.9375rem]",
        lg: "h-14 px-8 text-[1.0625rem]",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
