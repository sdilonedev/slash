import { cn } from "@/lib/utils";
import { buttonVariants } from "@/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";
import { PackageIcon, TriangleAlertIcon } from "lucide-react";

interface LinkLimitProps {
  userLinks: number;
  maxLinks: number;
}

export default function LinkLimit({ userLinks, maxLinks }: LinkLimitProps) {
  const isMaxLimit = userLinks >= maxLinks;
  const isHalfLimit = userLinks >= maxLinks / 2;

  const icon = isMaxLimit ? <TriangleAlertIcon size={14} /> : <PackageIcon size={14} />;

  const tooltipMessage = isMaxLimit
    ? `You have reached the maximum limit of ${maxLinks} links.`
    : `You have created ${userLinks} out of ${maxLinks} links.`;

  return (
    <TooltipProvider delayDuration={450}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={buttonVariants({
              variant: "outline",
              className: "cursor-default font-mono shadow-none px-4 py-2"
            })}
          >
            <div className={cn(
              "flex items-center space-x-2",
              isHalfLimit
                ? "text-yellow-500" : "",
              isMaxLimit ? "text-red-500" : "",
              "flex items-center space-x-2"
            )}>
              {icon}
              <span className="font-semibold">
                {userLinks < 10 ? `0${userLinks}` : userLinks}
                /
                {maxLinks < 10 ? `0${maxLinks}` : maxLinks}
              </span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm font-medium">{tooltipMessage}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
