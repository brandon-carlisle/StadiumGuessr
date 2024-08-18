import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";

import { LeagueOptionSchema } from "@/utils/types";

import Game from "@/components/game/game";
import LoadingSpinner from "@/components/ui/spinner";
import ToggleSound from "@/components/ui/toggle-sound";

// Leaflet needs the window object, so this needs to have dynamic
const DynamicMap = dynamic(() => import("../components/Map/DynamicMap"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

export default function PlayPage() {
  const { query } = useRouter();
  const { success, data } = LeagueOptionSchema.safeParse(query.league);
  const league = success ? data : null;

  return (
    <>
      <Head>
        <title>Play / StadiumGuessr</title>
        <meta
          name="description"
          content="A football stadium guessing game - challenge your football knowledge"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-dvh relative flex flex-col">
        <div className="absolute top-0 right-0 z-[10000] -translate-x-5 translate-y-5">
          <ToggleSound />
        </div>
        <DynamicMap />

        <Game league={league} />
      </main>
    </>
  );
}
