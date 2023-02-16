import { type GetServerSidePropsContext, type NextPage } from "next";
import { getServerAuthSession } from "../../server/auth";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../../components/Map"), { ssr: false });

export default function PlayPage() {
  return (
    <div className="min-h-screen w-full">
      <Map />
    </div>
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

  return {
    props: {
      session,
    },
  };
}
