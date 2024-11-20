import { Links } from "@prisma/client";
import ShowClicks from "./show-clicks";
import CopyLinkButton from "./copy-link";
import EditLink from "./edit-link";
import { formatDate } from "@/lib/utils";
import DeleteLink from "./delete-link";

export default function InfoLink({ links }: { links: Links }) {
  return (
    <div className="flex w-full flex-col rounded-md border border-neutral-200 p-3 shadow-sm dark:border-neutral-800">
      <div className="mb-1 flex w-full items-center justify-between space-x-2">
        <div className="flex items-center truncate">
          <a
            href={`/${links.shortCode}`}
            className="text-gray-100 text-xl hover:text-gray-300 transition-all"
          >

            <span className="opacity-40">/s/</span>
            <span>{links.shortCode}</span>
            <CopyLinkButton slug={links.shortCode} />
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <ShowClicks
            clicks={links.clickCount}
            lastDate={links.lastClicked}
            className="hidden border-r border-neutral-200 pr-2 dark:border-neutral-800 md:flex"
          />
          <EditLink link={links} />
          <DeleteLink link={links} />
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