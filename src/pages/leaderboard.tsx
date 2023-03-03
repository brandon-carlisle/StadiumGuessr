import type { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../server/auth";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);

  if (!session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const FAKE_LEADERBOARD = [
    {
      score: 20,
      user: "beanz",
    },
  ];

  return {
    props: { FAKE_LEADERBOARD },
  };
}

export default function FinishPage() {
  return <h1>Game has finished</h1>;
}
