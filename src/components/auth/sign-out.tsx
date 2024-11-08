"use client";

import { handleSignOut } from "@/server/handlers";
import { DropdownMenuItem } from "@/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { toast } from "sonner";


export default function SignOut() {
  const handleLogout = async () => {
    toast.promise(handleSignOut, {
      loading: "Signing out ⌚",
      error: "Failed to sign out. Please try again."
    });
  }
  return (
    <DropdownMenuItem className="text-red-600" onClick={() => handleLogout()}>
      <LogOutIcon size={16} />
      <span>Log Out</span>
    </DropdownMenuItem>
  )
}