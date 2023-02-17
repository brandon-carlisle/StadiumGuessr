import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../../server/auth";
import dynamic from "next/dynamic";
import { prisma } from "../../server/db";
import { Prisma } from "@prisma/client";

const DynamicMap = dynamic(() => import("../../components/DynamicMap"), {
  ssr: false,
  loading: () => <p className="text-4xl font-semibold">Map is loading..</p>,
});

interface Props {
  teams: Prisma.TeamSelect;
}

export default function PlayPage({ teams }: Props) {
  return (
    <main className="flex h-full flex-col">
      <div className="navbar">
        <input
          type="text"
          className="input-primary input"
          placeholder="45000"
        />
        <button className="btn-info btn" onClick={() => console.log(teams)}>
          Log the teams!
        </button>
      </div>
      <DynamicMap />
    </main>
  );
}

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

  const teams = await prisma.team.findMany();

  return {
    props: { teams },
  };
}
