"use client";

import type { Links } from "@prisma/client";
import { useState } from "react";
import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { Button } from "@/ui/button";
import { EditIcon, LoaderIcon, LockIcon, LockOpenIcon, SaveIcon } from "lucide-react";
import { Alert } from "@/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";

import { EditLinkSchema } from "@/server/validation";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { updateShortLink } from "@/server/actions/link";
import { Textarea } from "@/ui/textarea";

interface EditLinkProps {
  link: Links;
}

const EditLink = (props: EditLinkProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isError, setError] = useState<boolean>(false);
  const [unlockSlug, setUnlockSlug] = useState<boolean>(true);

  // Main form:
  const form = useForm<z.infer<typeof EditLinkSchema>>({
    resolver: zodResolver(EditLinkSchema),
    defaultValues: {
      id: props.link.id,
      originalUrl: props.link.originalUrl,
      shortCode: props.link.shortCode,
      description: props.link.description ?? "",
    },
  });

  // Form Submit method:
  const onSubmit = async (values: z.infer<typeof EditLinkSchema>) => {
    // Check if slug & url are equals to prevent infinite redirect =>
    if (values.shortCode === values.originalUrl) {
      setLoading(false);
      setError(true);
      setMessage("The URL and the slug cannot be the same");
      return;
    }

    try {
      setLoading(true);
      await updateShortLink(values);

      toast.success("Link edited successfully.", {
        description: `Url: https://localhost/${values.shortCode}`,
        duration: 10000,
        closeButton: true,
      });
      form.reset();
      setOpen(false);
    } catch {
      toast.error("An unexpected error has occurred. Please try again later.");
    } finally {
      setError(false);
      setMessage("");
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="transition-opacity hover:opacity-75">
          <EditIcon size={16} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="overflow-hidden">
          <DialogTitle>Edit link</DialogTitle>
          <DialogDescription className="block truncate">
            /{props.link.shortCode}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="originalUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination URL:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={props.link.originalUrl}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shortCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short link:</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          {...field}
                          placeholder={props.link.shortCode}
                          disabled={unlockSlug}
                        />
                        {unlockSlug ? (
                          <Popover>
                            <PopoverTrigger className="absolute bottom-0 right-0 top-0 flex items-center px-3">
                              <LockIcon size={16} />
                            </PopoverTrigger>
                            <PopoverContent className="max-w-72 text-sm">
                              <p className="mb-2">
                                Editing the custom link will remove access from
                                the previous link and it will be available to
                                everyone. Are you sure you want to continue?
                              </p>
                              <Button
                                onClick={() => setUnlockSlug(false)}
                                variant="outline"
                                className="w-full"
                              >
                                <LockOpenIcon size={16} />
                                <span>Unlock</span>
                              </Button>
                            </PopoverContent>
                          </Popover>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setUnlockSlug(true)}
                            className="absolute bottom-0 right-0 top-0 flex items-center px-3"
                          >
                            <LockOpenIcon size={16} />
                          </button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional):</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        defaultValue={props.link.description ?? "Description"}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isError && <Alert>{message}</Alert>}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost" disabled={loading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <LoaderIcon size={16} className="animate-spin" />
                ) : (
                  <SaveIcon size={16} />
                )}
                <span>{loading ? "Saving..." : "Save"}</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditLink;