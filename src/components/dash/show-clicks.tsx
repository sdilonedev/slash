import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";
import { cn, formatDate } from "@/lib/utils";
import { BarChartIcon } from "lucide-react";

interface ShowClicksProps {
  clicks: number;
  lastDate: Date | null;
  className?: string;
}

const ShowClicks = ({
  clicks,
  lastDate,
  className,
}: ShowClicksProps) => {
  return (
    <TooltipProvider delayDuration={500}>
      <Tooltip>
        <TooltipTrigger
          className={cn(
            "flex cursor-default items-center space-x-2 text-xs",
            className,
          )}
        >
          <BarChartIcon size={14} />
          <span className="font-mono">{clicks} clicks</span>
        </TooltipTrigger>
        <TooltipContent sideOffset={5}>
          {lastDate ? (
            <p>Last clicked: {formatDate(lastDate)}</p>
          ) : (
            <p>No clicks yet</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ShowClicks;