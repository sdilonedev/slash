"use client"

import { Button } from "@/ui/button";
import {
  CommandDialog,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/ui/command";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Pages, ColorThemes, SpamSocial } from "./items"
import { CommandIcon } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";


export default function CommandMenu() {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleAction = (action: () => void) => {
    action();
    setOpen(false);

  };

  const handleRoutePush = (href: string) => handleAction(() => router.push(href));
  const handleExternalRoute = (href: string) => handleAction(() => window.open(href, "_blank"));
  const handleChangeTheme = (theme: string) => handleAction(() => setTheme(theme));


  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
      >
        <CommandIcon />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle></DialogTitle>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="General">
            {Pages.map((page) => (
              <CommandItem
                key={page.href}
                onSelect={() => handleRoutePush(page.href)}
              >
                <page.icon size={22} strokeWidth={1.5} />
                <span>{page.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Theme">
            {ColorThemes.map((theme) => (
              <CommandItem
                key={theme.value}
                value={`Change Theme: ${theme.name}`}
                onSelect={() => handleChangeTheme(theme.value)}
              >
                <theme.icon size={22} strokeWidth={1.5} />
                <span>{theme.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Social">
            {SpamSocial.map((social) => (
              <CommandItem
                key={social.href}
                onSelect={() => handleExternalRoute(social.href)}
              >
                <social.icon width={14} />
                <span>{social.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}