import CreateLink from "@/components/dash/create-link";
import InputLinks from "@/components/dash/input-links";
import LinkLimit from "@/components/dash/link-limit";
import { Button } from "@/ui/button";
import { PlusIcon } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="md:hidden w-full flex my-3 items-center space-x-2 md:justify-between px-4">
      <InputLinks className="w-full flex" />
      <LinkLimit userLinks={20} maxLinks={30} />
      <CreateLink>
        <Button variant="outline">
          <PlusIcon size={15} />
          Create link
        </Button>
      </CreateLink>
    </div>
  )
}