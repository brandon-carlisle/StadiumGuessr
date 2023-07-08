import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
        <h2 className="mb-5 text-xl font-semibold">View all stadiums</h2>

        {isLoading && <p>Loading stadiums...</p>}

        {!stadiums ||
          (!stadiums.length && !isLoading && <p>No stadiums found...</p>)}
      </section>

      <section>
        <h2 className="mb-5 text-xl font-semibold">Add a new stadium</h2>
        <AdminForm />
      </section>
    </main>
  );
}

const schema = z.object({
  names: z.string().min(1),
  capacity: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  club: z.string().min(1),
});
type FormData = z.infer<typeof schema>;

function AdminForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("ran");
    console.log(data);
  };

  return (
    <>
      {/*  eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="names">
            <span className="label-text">
              Stadium names seperated with a comma
            </span>
          </label>
          <input
            id="names"
            type="text"
            placeholder="old trafford,theatre of dreams"
            className="input-bordered input w-full max-w-xs"
            {...register("names")}
          />
          {errors.names?.message && (
            <p className="mt-2 text-error">{errors.names?.message}</p>
          )}
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="capacity">
            <span className="label-text">Stadium capacity</span>
          </label>
          <input
            id="capacity"
            type="number"
            placeholder="60000"
            className="input-bordered input w-full max-w-xs"
            {...register("capacity")}
          />
          {errors.capacity?.message && (
            <p className="mt-2 text-error">{errors.capacity?.message}</p>
          )}
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="latitude">
            <span className="label-text">Stadium latitude</span>
          </label>
          <input
            id="latitude"
            type="text"
            placeholder="53.463056"
            className="input-bordered input w-full max-w-xs"
            {...register("latitude")}
          />
          {errors.latitude?.message && (
            <p className="mt-2 text-error">{errors.latitude?.message}</p>
          )}
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="longitude">
            <span className="label-text">Stadium longitude</span>
          </label>
          <input
            id="longitude"
            type="text"
            placeholder="-2.291389"
            className="input-bordered input w-full max-w-xs"
            {...register("longitude")}
          />
          {errors.longitude?.message && (
            <p className="mt-2 text-error">{errors.longitude?.message}</p>
          )}
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="longitude">
            <span className="label-text">Club</span>
          </label>
          <input
            id="club"
            type="text"
            placeholder="Manchester United"
            className="input-bordered input w-full max-w-xs"
            {...register("club")}
          />

          {errors.club?.message && (
            <p className="mt-2 text-error">{errors.club?.message}</p>
          )}
        </div>

        <button type="submit" className="btn-primary btn-wide btn mt-10">
          Add stadium
        </button>
      </form>
    </>
  );
}
