import { type Team } from '@prisma/client';
import useFinishGame from 'hooks/useFinishGame';
import useStartGame from 'hooks/useStartGame';
import dynamic from 'next/dynamic';

import { prisma } from '@server/db';

import GameControls from '@components/GameControls';
import Loading from '@components/Loading';
import Stats from '@components/Stats';

// Leaflet needs the window object, so this needs to have dynamic import
const DynamicMap = dynamic(() => import('../components/DynamicMap'), {
  ssr: false,
  loading: () => <Loading />,
});

interface PlayPageProps {
  teams: Team[];
}

export default function PlayPage({ teams }: PlayPageProps) {
  useStartGame(teams);
  const { completedGame } = useFinishGame();

  return (
    <main className="relative flex h-full flex-col">
      <DynamicMap />
      {!completedGame && <GameControls />}
      <Stats />
    </main>
  );
}

export async function getServerSideProps() {
  const teams = await prisma.team.findMany();

  return {
    props: { teams },
  };
}
