"use client"
import { Button } from "@/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog"
import { Input } from "@/ui/input"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateLinkSchema } from "@/server/validation"
import { createShortLink, isShortCodeAvailable } from "@/server/actions/link"
import { toast } from "sonner"
import { Alert } from "@/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { cn } from "@/lib/utils";
import { Textarea } from "@/ui/textarea";
import { Calendar as CalendarIcon, LoaderIcon, SaveIcon, ShuffleIcon } from "lucide-react"
import { Calendar } from "@/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { addDays, format } from "date-fns"
import { z } from "zod"

interface CreateLinkProps {
  children: React.ReactNode
}

export default function CreateLink(props: CreateLinkProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isError, setError] = useState<boolean>(false);

  const form = useForm<z.infer<typeof CreateLinkSchema>>({
    resolver: zodResolver(CreateLinkSchema),
    defaultValues: {
      originalUrl: "",
      shortCode: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof CreateLinkSchema>) {
    if (values.shortCode === values.originalUrl) {
      setLoading(false);
      setError(true);
      setMessage("The URL and the shortcode cannot be the same");
      return;
    }

    try {
      setLoading(true);

      const shortCodeAvailable = await isShortCodeAvailable(values.shortCode);

      if (!shortCodeAvailable) {
        toast.error(
          "The short link is already exist. Write another or generate a random shortcode.",
        );
        return;
      }
      
      console.log(values)
      const result = await createShortLink(values);

      if (result.errorMessage && result.isLimitReached) {
        toast.info(result.errorMessage);
        return;
      }

      toast.success("Link created successfully", {
        description: `Url: http://localhost:3000/${values.shortCode}`,
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

  const handleGenerateRandomCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const randomCode = Math.random().toString(36).substring(7);
    form.setValue("shortCode", randomCode);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {props.children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a new link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* URL Field */}
            <FormField
              control={form.control}
              name="originalUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original URL:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="off"
                      placeholder="https://example.com"
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Short code link */}
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
                        placeholder="Your link"
                        disabled={loading}
                      />
                      <Button
                        onClick={handleGenerateRandomCode}
                        variant="outline"
                        className="absolute right-0 rounded-none rounded-br-md rounded-tr-md"
                      >
                        <ShuffleIcon size={14} />
                        <span>Randomize</span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Expiration date picker */}
            <FormField
              control={form.control}
              name="expirationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiration date:</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon />
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                          <Select
                            onValueChange={(value) =>
                              form.setValue('expirationDate', addDays(new Date(), parseInt(value)))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              <SelectItem value="0">Today</SelectItem>
                              <SelectItem value="1">Tomorrow</SelectItem>
                              <SelectItem value="3">In 3 days</SelectItem>
                              <SelectItem value="7">In a week</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="rounded-md border">
                            <Calendar mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date()
                              }
                              initialFocus />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </FormControl>
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
                      placeholder="Enter a description"
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {isError && <Alert>{message}</Alert>}
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <LoaderIcon size={16} className="animate-spin" />
                ) : (
                  <SaveIcon size={16} />
                )}
                <span>{loading ? "Creating..." : "Create"}</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
