import { type GetServerSidePropsContext, type NextPage } from "next";
import { getServerAuthSession } from "../../server/auth";

const Play: NextPage = () => {
  return (
    <main>
      <h1 className="text-4xl">This is the game page</h1>
    </main>
  );
};

export default Play;

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
