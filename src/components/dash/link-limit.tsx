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

  const formattedUserLinks = userLinks.toString().padStart(2, "0");
  const formattedMaxLinks = maxLinks.toString().padStart(2, "0");

  const textColor = isMaxLimit
    ? "text-red-500"
    : isHalfLimit
    ? "text-yellow-500"
    : "dark:text-white text-black";

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
            <div className={`flex items-center space-x-2 ${textColor}`}>
              {icon}
              <span className="font-semibold">
                {formattedUserLinks}/{formattedMaxLinks}
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
