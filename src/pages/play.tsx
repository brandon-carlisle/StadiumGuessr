// import { type Team } from "@prisma/client";
// import dynamic from "next/dynamic";
// import Head from "next/head";

// import { useEffect } from "react";
// import { prisma } from "@server/db";
// import { setUserHasFinishedGame } from "@store/features/game/game-slice";
// import { useAppDispatch, useAppSelector } from "@store/hooks";
// import GameControlsOverlay from "@components/GameControlsOverlay/GameControlsOverlay";
// import Stats from "@components/GameStatsOverlay/GameStatsOverlay";

// import Loading from "@components/ui/Loading";

// import useFinishGame from "@hooks/useFinishGame";
// import useStartGame from "@hooks/useStartGame";

// Leaflet needs the window object, so this needs to have dynamic import
// const DynamicMap = dynamic(() => import("../components/Map/DynamicMap"), {
//   ssr: false,
//   loading: () => <Loading />,
// });

// interface PlayPageProps {
//   teams: Team[];
// }

export default function PlayPage() {
  // const dispatch = useAppDispatch();
  // const { timeRemaining, teamsRemaining } = useAppSelector(
  //   (state) => state.game,
  // );

  // useStartGame(teams);
  // const { completedGame } = useFinishGame();

  // useEffect(() => {
  //   if (timeRemaining === 0 || teamsRemaining === 0) {
  //     dispatch(setUserHasFinishedGame(true));
  //   }
  // }, [dispatch, teamsRemaining, timeRemaining]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="alert w-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-info"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>Site is getting a rework...</span>
      </div>
    </div>
  );

  // return (
  //   <>
  //     <Head>
  //       <title>StadiumGuessr / Play</title>
  //     </Head>
  //     <main classNameName="relative flex h-full flex-col">
  //       <DynamicMap />
  //       {!completedGame && <GameControlsOverlay />}
  //       <Stats />
  //     </main>
  //   </>
  // );
}

// export async function getServerSideProps() {
//   const teams = await prisma.team.findMany();

//   return {
//     props: { teams },
//   };
// }
