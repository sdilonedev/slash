"use client";

import { Button } from "@/ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import GithubIcon from "../icons/github";
import GoogleIcon from "../icons/google";

const socialProviders = [
  {
    name: "Continue with Google",
    icon: <GoogleIcon className="h-4 w-4" />,
    provider: "google",
  },
  {
    name: "Continue with GitHub",
    icon: <GithubIcon className="h-4 w-4" />,
    provider: "github",
  },
];

const SocialLogin = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [loading, setLoading] = useState<boolean>(false);
  const [provider, setProvider] = useState<string | null>();

  const handleSocialLogin = async (provider: string) => {
    try {
      setLoading(true);
      setProvider(provider);
      await signIn(provider, {
        callbackUrl: callbackUrl || "/",
      });
    } catch {
      toast.error("An error occurred while trying to sign in");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      {socialProviders.map((sp) => (
        <Button
          key={sp.provider}
          variant="outline"
          className="w-full"
          disabled={loading}
          name={sp.name}
          onClick={() => handleSocialLogin(sp.provider)}
        >
          {provider === sp.provider ? (
            <Loader className="animate-spin" size={18} />
          ) : (
            sp.icon
          )}
          <span>{sp.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default SocialLogin;