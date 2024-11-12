"use client";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { toast } from "sonner";
import { ClipboardIcon } from "lucide-react";
import { Button } from "@/ui/button";

interface CopyLinkProps {
  slug: string;
  className?: string;
}

export default function CopyLinkButton(props: CopyLinkProps) {
  const [, copy] = useCopyToClipboard();
  const url = "http://localhost:3000";

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        toast.success("Link copied to clipboard", {
          description: `${text}`,
        });
      })
      .catch((error) => {
        toast.error(
          "An unexpected error has occurred. Please try again later.",
          {
            description: error,
          },
        );
      });
  };

  return (
    <button className="transition-opacity hover:opacity-75" onClick={handleCopy(`${url}/${props.slug}`)}>
      <ClipboardIcon size={15} />
    </button>
  );
};