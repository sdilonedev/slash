import { Button } from "@/ui/button";
import { ArrowRight } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full animate-fade-in border-b backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between px-4">
        <a className="text-md flex items-center">Slash</a>
        <div className="ml-auto flex h-full items-center">
          <Button variant="outline" className="group">
            Get started
            <ArrowRight className="ml-1 size-4 transform transition-transform group-hover:translate-x-[2px]" />
          </Button>
        </div>
      </div>
    </header>
  )
}