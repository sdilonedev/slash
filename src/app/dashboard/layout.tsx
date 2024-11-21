import DashBreadcrumbs from "@/components/dash/breadcrumbs";
import Header from "@/components/layout/header";
import { getLinksByUser } from "@/server/actions/link";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const data = await getLinksByUser();

  if (!data) {
    return <div>Error</div>
  }
  return (
    <>
      <Header />
      <nav className="fixed z-50 flex w-full items-center border-b border-neutral-200 bg-white shadow-sm backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900">
        <div className="w-full mx-auto container">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 text-sm font-medium rtl:space-x-reverse">
              <DashBreadcrumbs />
            </div>

          </div>
        </div>
      </nav>
      <main className="flex mx-auto my-16 w-full items-center container">
        {children}
      </main>
    </>
  )
}