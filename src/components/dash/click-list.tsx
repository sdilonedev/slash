import { parseUserAgent } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";
import { BarChartIcon } from "lucide-react";


interface Click {
  id: string;
  ipAddress: string;
  userAgent: string;
  referrer: string | null;
  clickedAt: string;
}

interface GroupedClicks {
  [ip: string]: Click[];
}

export default function ClickList({ groupedClicks }: { groupedClicks: GroupedClicks }) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2">
      {Object.keys(groupedClicks).map((ip) => (
        <div
          key={ip}
          className="flex flex-col rounded-md border border-neutral-200 p-3 shadow-sm dark:border-neutral-800 border-b"
        >
          {/* IP Address Header */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-200">
              IP: {ip}
            </h2>
            <TooltipProvider delayDuration={500}>
              <Tooltip>
                <TooltipTrigger
                  className="flex cursor-default items-center space-x-2 text-xs"
                >
                  <BarChartIcon size={14} />
                  <span className="font-mono">{groupedClicks[ip].length} clicks</span>
                </TooltipTrigger>
                <TooltipContent sideOffset={5}>
                  This devices has clicked this link: {groupedClicks[ip].length} times.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {groupedClicks[ip].map((click) => {
            const { os, browser, engine } = parseUserAgent(click.userAgent);

            return (
              <div key={click.id} className="flex items-center justify-between font-mono text-xs font-medium text-neutral-600 dark:text-neutral-400 md:space-x-2">
                <div className="flex max-w-[75%] items-center space-x-2">
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>
                      <strong>OS:</strong> {os}
                    </li>
                    <li>
                      <strong>Browser:</strong> {browser}
                    </li>
                    <li>
                      <strong>Browser Engine:</strong> {engine}
                    </li>
                    <li>
                      <strong>Referrer:</strong> {click.referrer || "No referrer"}
                    </li>
                  </ul>
                </div>
                <p>{click.clickedAt}</p>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  );
}
