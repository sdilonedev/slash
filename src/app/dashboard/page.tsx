import InfoLink from "@/components/auth/info-link";
import CreateLink from "@/components/dash/create-link";
import InputLinks from "@/components/dash/input-links";
import LinkLimit from "@/components/dash/link-limit";
import { getLinksByUser } from "@/server/actions/link";
import { Button } from "@/ui/button";
import { LightbulbIcon, PlusIcon } from "lucide-react";

export default async function DashboardPage({ searchParams }: { searchParams: { search?: string } }) {
  const data = await getLinksByUser();
  const search = await searchParams.search

  if (!data) {
    return <div>Error</div>
  };

  const filteredLinks = data.links.filter((link) => {
    if (!search) return true;

    return !search || link.shortCode.includes(search);
  });
  return (
    <div className="w-full">
      <div className="md:hidden w-full flex my-3 items-center space-x-2 md:justify-between lg:px-4">
        <InputLinks className="w-full flex" />
        <LinkLimit userLinks={20} maxLinks={30} />
        <CreateLink>
          <Button variant="outline">
            <PlusIcon size={15} />
            <span className="hidden md:flex">Create Link</span>
          </Button>
        </CreateLink>
      </div>


      <div className="grid grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-2">
        {filteredLinks
          .sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          })
          .map((link) => {
            return (
              <InfoLink
                key={link.id}
                links={link}
              />
            );
          })}
        {filteredLinks.length === 0 && (
          <div className="mt-4 flex flex-col items-center justify-center space-y-3 text-center">
            {search ?? (
              <LightbulbIcon size={48} strokeWidth={0.5} />
            )}
            {search ?? (
              <p>
                No links found with{" "}
                <span className="font-mono">{search}</span> slug
              </p>
            )}
            <CreateLink search={search}>
              <Button variant="outline">
                <PlusIcon size={14} />
                <span>
                  {search
                    ? `Create a link with ${search} short code`
                    : "Create a new link"}
                </span>
              </Button>
            </CreateLink>
          </div>
        )}
      </div>
    </div>
  )
}