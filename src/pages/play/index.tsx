import { type GetServerSidePropsContext, type NextPage } from "next";
import { getServerAuthSession } from "../../server/auth";

const Play: NextPage = () => {
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <main className="drawer-content relative">
        {/* <!-- Page content here --> */}

        <label
          htmlFor="my-drawer-4"
          className="btn-primary drawer-button btn absolute top-4 left-4"
        >
          Menu
        </label>
      </main>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <ul className="menu w-80 bg-base-100 p-4 text-base-content">
          {/* <!-- Sidebar content here --> */}
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
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
