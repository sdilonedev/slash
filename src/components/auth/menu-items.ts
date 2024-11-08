import { BugIcon, EyeIcon, HomeIcon, LayoutDashboardIcon, SettingsIcon } from "lucide-react";

export const MenuItems = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: SettingsIcon,
  },
  {
    name: "View link watchers",
    href: "/dashboard/watchers",
    icon: EyeIcon,
  },
  {
    name: "Report a bug",
    href: "https://github.com/sdilonedev/slash/issues/new/choose",
    icon: BugIcon,
  }
]