import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Button variants matching the prototype:
 * - mono uppercase labels, 3px radius, 1.5px borders
 * - Filled (orange), outline (ink), ghost (muted), sm size
 */
const buttonVariants = cva(
  "inline-flex items-center gap-2 whitespace-nowrap rounded-[3px] font-mono text-[12.5px] font-medium uppercase tracking-[0.03em] transition-colors duration-150 outline-none select-none focus-visible:ring-2 focus-visible:ring-orange/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-[1.5px] border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
        fill: "border-[1.5px] border-orange bg-orange text-white hover:border-orange-ink hover:bg-orange-ink",
        ghost:
          "border-[1.5px] border-line-2 text-muted hover:border-ink hover:text-ink hover:bg-transparent",
        link: "text-orange-ink underline-offset-4 hover:underline border-0",
      },
      size: {
        default: "px-[18px] py-[11px]",
        sm: "px-[13px] py-[8px] text-[11px]",
        icon: "h-[38px] w-[38px] justify-center p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
