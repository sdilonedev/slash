import { Links } from "@prisma/client";


export default function InfoLink({ links }: { links: Links}) {
  return (
    <div className="flex w-full flex-col rounded-md border border-neutral-200 p-3 shadow-sm dark:border-neutral-800">
      <div className="mb-1 flex w-full items-center justify-between space-x-2">
        <a
          href={`/${links.shortCode}`}
          className="block  space-x-[1px] overflow-hidden truncate font-medium transition-opacity duration-75 hover:opacity-80"
        >
          <span className="text-sm opacity-40">/</span>
          <span>{links.shortCode}</span>
        </a>
        <div className="flex items-center space-x-3">
          <p
            className="mb-2 truncate font-mono text-sm text-neutral-500 dark:text-neutral-400"
            title={links.originalUrl}
          >
            {links.originalUrl}
          </p>
        </div>
        <p
          className="hidden truncate md:block"
          title={links.description ?? ""}
        >
          {links.description}
        </p>

      </div>
      <p>{new Date(links.createdAt).toLocaleString()}</p>
    </div>
  )
}