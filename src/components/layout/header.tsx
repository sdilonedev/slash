import { Button } from "@/ui/button";
import { SlashSquareIcon } from "lucide-react";
import Link from "next/link";
import GithubIcon from "../icons/github";
import CommandMenu from "../command/command-menu";
import { ThemeToggle } from "../dropdowns/theme-toggle";
import UserButton from "../auth/user-button";

export default function Header() {
  return (
    <header className="flex w-full py-4 lg:px-5 sticky top-0 z-20 border-b bg-white dark:border-b-neutral-800 dark:bg-neutral-900">
      <div className="flex justify-between w-full mx-auto px-4">
        <div className="flex items-center space-x-5">
          <Link href="/" className="flex items-center space-x-3 transition-opacity hover:opacity-80">
            <SlashSquareIcon className="size-4" />
            <span className="self-center text-lg font-medium tracking-tighter dark:text-white font-mono">slash</span>
          </Link>
        </div>

        <div className="flex items-center space-x-1">
          <CommandMenu />
          <Button variant="ghost" size="icon">
            <GithubIcon />
          </Button>
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  )
}