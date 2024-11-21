import ClicksList from "@/components/dash/click-list";
import { formatDate } from "@/lib/utils";
import { getLinksByUser } from "@/server/actions/link";
import db from "@/server/db";

interface Click {
  id: string;
  ipAddress: string;
  userAgent: string;
  referrer: string | null;
  clickedAt: string;
}

interface GroupedClicks {
  [ip: string]: Click[];
}

export default async function WatchersPage() {
  const user = await getLinksByUser();

  if (!user) {
    console.error("User is not authenticated.");
    throw new Error("Authentication required. Please log in.");
  }

  const userLinkIds = user.links.map((link) => link.id);

  console.log(userLinkIds)
  const clicksFromDb = await db.urlClicks.findMany({
    where: { urlId: { in: userLinkIds } },
    include: {
      link: true,
    },
    orderBy: {
      clickedAt: "desc"
    }
  });


  if (!clicksFromDb || clicksFromDb.length === 0) {
    console.log("No clicks found for the user's URLs.");
    return <div>No clicks found for your URLs.</div>;
  }

  const clicks: Click[] = clicksFromDb.map((click) => ({
    id: click.id,
    ipAddress: click.ipAddress,
    userAgent: click.userAgent,
    referrer: click.referrer,
    clickedAt: formatDate(click.clickedAt),
  }));

  const groupedByIP: GroupedClicks = {};

  clicks.forEach((click) => {
    const ip = click.ipAddress;

    if (!groupedByIP[ip]) {
      groupedByIP[ip] = [];
    }

    // Agrega el clic al grupo correspondiente por IP
    groupedByIP[ip].push(click);
  });

  // Renderiza los clics agrupados por IP
  return (
    <>
      <ClicksList groupedClicks={groupedByIP} />
    </>
  );
}
