"use client"

import useDebounce from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { Input } from "@/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function InputLinks({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedSearch, searchParams, pathname, router]);


  return (
    <div className={cn("relative", className)}>
      <SearchIcon
        className="absolute left-2 top-1/2 -translate-y-1/2 transform text-neutral-400"
        size={16}
      />
      <Input
        type="search"
        autoComplete="off"
        placeholder="Search links"
        className="pl-8"
        onChange={handleSearch}
        defaultValue={searchParams.get("search")?.toString()}
      />
    </div>
  )
}