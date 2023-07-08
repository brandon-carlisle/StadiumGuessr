import { useSession } from "next-auth/react";

import { api } from "@/utils/api";

import Loading from "@/components/ui/Loading";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const { data: stadiums, isLoading } = api.stadium.getAll.useQuery();

  if (status === "loading") return <Loading />;

  if (!session || session.user.role !== "ADMIN")
    return <p>You are not authorized</p>;

  return (
    <main className="p-8">
      <h1 className="mb-10 text-2xl font-bold text-primary-content/90 md:text-4xl">
        Welcome back, {session.user.name}
      </h1>

      <section className="mb-10">
        <h2 className="mb-5 text-xl font-semibold">View all Stadiums</h2>

        {isLoading && <p>Loading stadiums...</p>}

        {!stadiums ||
          (!stadiums.length && !isLoading && <p>No stadiums found...</p>)}
      </section>

      <section>
        <h2 className="mb-5 text-xl font-semibold">Add a new stadium</h2>
      </section>
    </main>
  );
}
