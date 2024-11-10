"use client";

import { cn } from "@/lib/utils";
import { EyeIcon, LinkIcon, SettingsIcon } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation"

const breadcrums = [
  {
    title: "Links",
    href: "/dashboard",
    icon: LinkIcon,
  },
  {
    title: "Watchers",
    href: "/dashboard/watchers",
    icon: EyeIcon,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
  }
]

export default function DashBreadcrumbs() {
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center space-x-7">
        {breadcrums.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className={cn(
              "group relative px-1 pb-4 pt-3 text-sm font-medium outline-2 outline-sky-400 transition-colors duration-100 hover:bg-transparent hover:text-neutral-900 focus-visible:outline dark:hover:text-white",
              pathname === item.href
                ? "border-b border-neutral-800 dark:border-white dark:text-white"
                : "text-neutral-500",
            )}
          >
            <div className=" relative z-10 flex items-center space-x-2">
              <item.icon
                size={18}
                className="duration-300 group-hover:rotate-6"
              />
              <span>{item.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}