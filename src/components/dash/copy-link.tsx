"use client";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { toast } from "sonner";
import { CopyIcon } from "lucide-react";

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
    <button className="p-1 ml-1 text-gray-500 hover:text-gray-200 transition-colors duration-200" onClick={handleCopy(`${url}/${props.slug}`)}>
      <CopyIcon size={15} />
    </button>
  );
};