import { EyeIcon, HomeIcon, LayoutDashboardIcon, MonitorIcon, MoonIcon, SettingsIcon, SunIcon } from "lucide-react";
import XIcon from "../icons/x";
import GithubIcon from "../icons/github";
import LinkedinIcon from "../icons/linkedin";

export const Pages = [
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
    name: "View link watchers",
    href: "/dashboard/watchers",
    icon: EyeIcon,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
  }
];

export const ColorThemes = [
  {
    name: "Light Theme",
    value: "light",
    icon: SunIcon,
  },
  {
    name: "Dark Theme",
    value: "dark",
    icon: MoonIcon,
  },
  {
    name: "System Theme",
    value: "system",
    icon: MonitorIcon,
  }
]

export const SpamSocial = [
  {
    name: "Twitter",
    href: "https://x.com/sdilonedev",
    icon: XIcon,
  },
  {
    name: "Github",
    href: "https://github.com/sdilonedev",
    icon: GithubIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/stalindilone/",
    icon: LinkedinIcon,
  }
]