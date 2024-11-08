"use client";


import { signIn } from "next-auth/react";
import { Button } from "@/ui/button";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import GithubIcon from "../icons/github";
import { Loader } from "lucide-react";

export default function LoginButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [loading, setLoading] = useState<boolean>(false);


  const handleLogIn = async () => {
    try {
      setLoading(true)
      await signIn('github', {
        callbackUrl: callbackUrl || "/",
      });
    } catch {
      toast.error("An error ocurred while trying to sign in.")
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-1">
      <Button
        onClick={() => handleLogIn()}
        variant="outline"
        disabled={loading}
        className="w-full"
        key="github"
      >
        {loading ? (
          <Loader className="animate-spin" size={18} />
        ) : (
          <GithubIcon className="size-4" />
        )}
        <span>Continue with GitHub</span>
      </Button>
    </div>
  )
}