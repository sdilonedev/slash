import { buttonVariants } from "@/ui/button";
import { auth } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/ui/dropdown-menu";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MenuItems } from "./menu-items";
import SignOut from "./sign-out";

export default async function UserButton() {
  const session = await auth();

  if (!session?.user)
    return (
      <Link
        href="/dashboard"
        className={buttonVariants({
          variant: "outline",
          className: "group",
        })}
      >
        <span>Get Started</span>
        <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-[2px]" />
      </Link>
    );

  if (session?.user)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          name={session.user.name ?? "User Menu"}
          className={buttonVariants({
            variant: "ghost",
            size: "icon",
          })}
        >
          {session.user.name && (
            <Image src={session.user.image || ""} alt={session.user.name} className="size-6 rounded-full" width={24} height={24} />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user.name}
              </p>
              <p className="text-xs leading-none text-neutral-400">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {MenuItems.map((item) => (
            <>
              <DropdownMenuItem>
                <Link className="flex flex-row gap-2" href={item.href}>
                  <item.icon size={16} />
                  <span>{item.name}</span>
                </Link>
              </DropdownMenuItem>
            </>
          ))}
          <DropdownMenuSeparator />
          <SignOut />
        </DropdownMenuContent>
      </DropdownMenu>
    );
}