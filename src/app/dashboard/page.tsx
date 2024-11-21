import InfoLink from "@/components/dash/info-link";
import CreateLink from "@/components/dash/create-link";
import InputLinks from "@/components/dash/input-links";
import LinkLimit from "@/components/dash/link-limit";
import { getLinksByUser } from "@/server/actions/link";
import { Button } from "@/ui/button";
import { LightbulbIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
        <LinkLimit userLinks={data.links.length} maxLinks={data.limit} />
        <CreateLink>
          <Button variant="outline">
            <PlusIcon size={15} />
            <span className="hidden md:flex">Create Link</span>
          </Button>
        </CreateLink>
      </div>



      <div
        className={cn(
          filteredLinks.length > 0
            ? "grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col items-center justify-center mt-4 space-y-3 text-center"
        )}
      >
        {filteredLinks.length > 0 && search?.length === undefined ? (
          filteredLinks
            .sort((a, b) => {
              return (
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              );
            })
            .map((link) => (
              <InfoLink
                key={link.id}
                links={link}
              />
            ))
        ) : (
          <>
            {search ? (
              <>
                <p>
                  No links found with <span className="font-mono">{search}</span> slug
                </p>
                <CreateLink search={search}>
                  <Button variant="outline">
                    <PlusIcon size={14} />
                    <span>Create a link with {search} short code</span>
                  </Button>
                </CreateLink>
              </>
            ) : (
              <>
                <LightbulbIcon size={48} strokeWidth={0.5} />
                <p>No links available yet. Start creating your first one!</p>
                <CreateLink>
                  <Button variant="outline">
                    <PlusIcon size={14} />
                    <span>Create a new link</span>
                  </Button>
                </CreateLink>
              </>
            )}
          </>
        )}
      </div>

    </div>
  )
}