import DashBreadcrumbs from "@/components/dash/breadcrumbs";
import CreateLink from "@/components/dash/create-link";
import LinkLimit from "@/components/dash/link-limit";
import DashHeader from "@/components/layout/dash-header";
import { Button } from "@/ui/button";
import { PlusIcon } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashHeader />

      <nav className="fixed z-50 w-full bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-sm backdrop-blur-md">
        <div className="w-full mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 text-sm font-medium rtl:space-x-reverse">
              <DashBreadcrumbs />

            </div>

            <div className="hidden md:flex items-center space-x-2">
              <LinkLimit userLinks={29} maxLinks={30} />

              <CreateLink>
                <Button variant="outline">
                  <PlusIcon size={15} />
                  Create link
                </Button>
              </CreateLink>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex mx-auto my-16 w-full max-w-screen-xl px-4 items-center">
        {children}
      </main>
    </>
  )
}