import { Links } from "@prisma/client";
import ShowClicks from "./show-clicks";
import CopyLinkButton from "./copy-link";
import EditLink from "./edit-link";
import { SettingsIcon } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function InfoLink({ links }: { links: Links }) {
  return (
    <div className="flex w-full flex-col rounded-md border border-neutral-200 p-3 shadow-sm dark:border-neutral-800">
      <div className="mb-1 flex w-full items-center justify-between space-x-2">
        <a
          href={`/${links.shortCode}`}
          className="block space-x-[1px] overflow-hidden truncate font-medium transition-opacity duration-75 hover:opacity-80"
        >
          <span className="text-sm opacity-40">/</span>
          <span>{links.shortCode}</span>
        </a>
        <div className="flex items-center space-x-3">
          <ShowClicks
            clicks={links.clickCount}
            lastDate={links.lastClicked}
            className="hidden border-r border-neutral-200 pr-2 dark:border-neutral-800 md:flex"
          />
          <CopyLinkButton slug={links.shortCode} />
          <EditLink
            trigger={
              <button className="transition-opacity hover:opacity-75">
                <SettingsIcon size={16} />
              </button>
            }
            link={links}
          />
        </div>
      </div>
      <p
        className="mb-2 truncate font-mono text-sm text-neutral-500 dark:text-neutral-400"
        title={links.originalUrl}
      >
        {links.originalUrl}
      </p>
      <div>
        <div className="flex items-center justify-between font-mono text-xs font-medium text-neutral-600 dark:text-neutral-400 md:space-x-2">
          <div className="flex max-w-[75%] items-center space-x-2">
            <p
              className="hidden truncate md:block"
              title={links.description ?? ""}
            >
              {links.description}
            </p>
          </div>
          <p>{formatDate(new Date(links.createdAt))}</p>
        </div>
      </div>
    </div>
  )
}