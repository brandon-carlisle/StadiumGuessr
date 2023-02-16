import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../../server/auth";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("../../components/DynamicMap"), {
  ssr: false,
});

export default function PlayPage() {
  return (
    <main className="min-h-screen w-screen">
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

  return {
    props: {
      session,
    },
  };
}
