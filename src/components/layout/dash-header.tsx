import { SlashSquareIcon } from "lucide-react";
import Link from "next/link"
import InputLinks from "../dash/input-links";
import UserButton from "../auth/user-button";
import CommandMenu from "../command/command-menu";
import { Button } from "@/ui/button";
import GithubIcon from "../icons/github";
import { ThemeToggle } from "../dropdowns/theme-toggle";


export default function DashHeader() {
  return (
    <header className="flex w-full px-4 py-4 lg:py-5 justify-between items-center gap-2 border-b bg-white dark:border-b-neutral-800 dark:bg-neutral-900">
      <div className="flex items-center px-4">
        <Link href="/" className="flex items-center space-x-3 transition-opacity hover:opacity-80">
          <SlashSquareIcon className="size-4" />
          <span className="self-center text-lg font-medium tracking-tighter dark:text-white font-mono">slash</span>
        </Link>
      </div>

      {/* Input desktop */}
      <div className="hidden w-1/3 items-center gap-2 px-4 md:flex">
        <InputLinks className="w-full" />
      </div>

      <div className="flex items-center gap-2 px-4">
        <CommandMenu />
        <Button variant="ghost" size="icon">
          <GithubIcon />
        </Button>
        <ThemeToggle />
        <UserButton />
      </div>

    </header>
  )
}