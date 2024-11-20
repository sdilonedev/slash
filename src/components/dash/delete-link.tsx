"use client";

import type { Links } from "@prisma/client";
import type { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { LoaderIcon, TrashIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { deleteShortLink } from "@/server/actions/link";
import { DeleteLinkSchema } from "@/server/validation";

interface DeleteLinkProps {
  link: Links;
}

const DeleteLink = ({ link }: DeleteLinkProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof DeleteLinkSchema>>({
    resolver: zodResolver(DeleteLinkSchema),
  });

  const handleDelete = async (values: z.infer<typeof DeleteLinkSchema>) => {
    if (values.shortCode !== link.shortCode) {
      toast.error("The slug does not match.");
      return;
    }

    try {
      setLoading(true);
      await deleteShortLink(link.id);
      setOpen(false);
      toast.success("Link deleted successfully.", {
        description: `The link /${link.shortCode} has been deleted.`,
      });
    } catch {
      toast.error(
        "An error occurred while deleting the link. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="transition-opacity hover:opacity-75">
          <TrashIcon size={16} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete /{link.shortCode}</DialogTitle>
          <DialogDescription className="text-red-500 dark:text-red-400">
            Access to the link will be permanently removed. This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleDelete)}>
            <FormField
              control={form.control}
              name="shortCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Type <span className="font-mono">{link.shortCode}</span> to
                    confirm:
                  </FormLabel>
                  <FormControl>
                    <Input {...field} disabled={loading} autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button variant="ghost" disabled={loading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={loading} type="submit" variant="destructive">
                {loading ? (
                  <LoaderIcon size={16} className="animate-spin" />
                ) : (
                  <TrashIcon size={16} />
                )}
                <span>{loading ? "Deleting..." : "Delete"}</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteLink;