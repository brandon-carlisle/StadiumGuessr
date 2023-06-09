import { type Team } from '@prisma/client';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import { prisma } from '@server/db';

import { updateTeam } from '@store/features/game/game-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';

import GameControls from '@components/GameControls';
import Loading from '@components/Loading';
import Stats from '@components/Stats';

import { type ResponseData } from './api/upload-match';

// Leaflet needs the window object, so this needs to have dynamic import
const DynamicMap = dynamic(() => import('../components/DynamicMap'), {
  ssr: false,
  loading: () => <Loading />,
});

export async function getServerSideProps() {
  const teams = await prisma.team.findMany();

  return {
    props: { teams },
  };
}

export interface MatchData {
  score: number;
  user: string | undefined;
}

function shuffleTeams(input: Team[]) {
  return input
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

interface PlayPageProps {
  teams: Team[];
}

export default function PlayPage({ teams }: PlayPageProps) {
  const dispatch = useAppDispatch();
  const { userHasFinishedGame, score } = useAppSelector((state) => state.game);
  const { data: session } = useSession();
  const router = useRouter();

  const shuffledTeams = useMemo(() => shuffleTeams(teams), [teams]);

  useEffect(() => {
    dispatch(updateTeam(shuffledTeams[0]));
  }, [dispatch, shuffledTeams]);

  useEffect(() => {
    if (!session && userHasFinishedGame) {
      void router.push('/leaderboard');
    }

    if (session && userHasFinishedGame) {
      const match: MatchData = {
        score,
        user: session?.user.id,
      };

      void (async () => {
        const { status } = await uploadMatch(match);
        if (status === 'completed') void router.push('/leaderboard');
        else void router.push('/');
      })();
    }
  }, [router, score, session, session?.user.id, userHasFinishedGame]);

  return (
    <main className="relative flex h-full flex-col">
      <DynamicMap />
      {!userHasFinishedGame && <GameControls teams={shuffledTeams} />}
      <Stats />
    </main>
  );
}

async function uploadMatch(match: MatchData) {
  const res = await fetch('/api/upload-match', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(match),
  });

  if (!res.ok) throw new Error('Could not create match');

  // TODO find better way to type this
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: ResponseData = await res.json();

  return { status: data.message };
}
