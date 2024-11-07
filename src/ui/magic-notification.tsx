import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const MagicNotification = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "backdrop-filter-[12px] inline-flex h-7 items-center justify-between rounded-full border border-white/5 bg-white/10 px-3 text-xs text-white dark:text-black transition-all ease-in hover:cursor-pointer hover:bg-white/20 group gap-1 translate-y-[-1rem] animate-fade-in",
        className
      )}
      {...props}
    >
      <p
        style={{ "--shimmer-width": "100px" } as React.CSSProperties}
        className="mx-auto max-w-md text-neutral-600/50 dark:text-neutral-400/50 animate-shimmer bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shimmer-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite] bg-gradient-to-r from-neutral-100 via-black/80 via-50% to-neutral-100 dark:from-neutral-900 dark:via-white/80 dark:to-neutral-900 inline-flex items-center justify-center"
      >
        <span>{children}</span>
        <ArrowRight
          size={15}
          className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
        />
      </p>
    </div>
  )
);

MagicNotification.displayName = "MagicNotification";

export default MagicNotification;
