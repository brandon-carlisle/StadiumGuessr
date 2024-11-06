import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";

import Game from "@/components/game/game";
import LoadingSpinner from "@/components/ui/spinner";
import ToggleSound from "@/components/ui/toggle-sound";

// Leaflet needs the window object, so this needs to have dynamic
const LeafletMap = dynamic(() => import("@/components/game/leaflet-map"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

export default function PlayPage() {
  const router = useRouter();
  const leagueCode = router.query.leagueCode as string;

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

      <MainGameView leagueCode={leagueCode} />
    </>
  );
}

interface MainGameViewProps {
  leagueCode: string;
}

function MainGameView({ leagueCode }: MainGameViewProps) {
  if (leagueCode !== "EPL") {
    return <div>invalid code</div>;
  }

  return (
    <main className="h-dvh relative flex flex-col">
      <div className="absolute top-0 right-0 z-[10000] -translate-x-5 translate-y-5">
        <ToggleSound />
      </div>

      <LeafletMap />

      <Game leagueCode={leagueCode} />
    </main>
  );
}
