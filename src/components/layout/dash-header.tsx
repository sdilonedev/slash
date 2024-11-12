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
    <header className="flex w-full pb-3 pt-4 lg:px-4 sticky top-0 z-50 bg-white dark:bg-neutral-900">
      <div className="flex items-center justify-between mx-auto container w-full">
        <div className="flex items-center space-x-1">
          <Link href="/" className="flex items-center space-x-3 transition-opacity hover:opacity-80">
            <SlashSquareIcon className="size-4" />
            <span className="self-center text-lg font-medium tracking-tighter dark:text-white font-mono">slash</span>
          </Link>
        </div>

        {/* Input desktop */}
        <div className="hidden w-1/3 items-center gap-2 md:flex">
          <InputLinks className="w-full" />
        </div>

        <div className="flex items-center gap-2 space-x-1">
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