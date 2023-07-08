import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "@/utils/api";

import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function AdminPage() {
  const { data: session, status: sessionStatus } = useSession();
  const { data: stadiums, isLoading } = api.stadium.getAll.useQuery();

  if (sessionStatus === "loading")
    return (
      <div className="grid h-screen w-screen place-items-center">
        <LoadingSpinner />
      </div>
    );

  if (!session || session.user.role !== "ADMIN")
    return <p>You are not authorized</p>;

  return (
    <main className="p-8">
      <h1 className="mb-10 text-2xl font-bold text-primary-content/90 md:text-4xl">
        Welcome back, {session.user.name}
      </h1>

      <section className="mb-10">
        <h2 className="mb-5 text-xl font-semibold">View all stadiums</h2>

        {isLoading && <LoadingSpinner />}

        {!stadiums || (!stadiums.length && !isLoading) ? (
          <p>No stadiums found...</p>
        ) : (
          stadiums.map((stadium) => <div key={stadium.id}>{stadium.club}</div>)
        )}
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
  capacity: z.coerce.number(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  club: z.string().min(1),
});
type FormData = z.infer<typeof schema>;

// TODO: This form can be cleaned up later (mostly the inputs)
function AdminForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutate, error, isError, isLoading, isSuccess } =
    api.stadium.create.useMutation();

  if (isError) {
    alert(error.message);
  }

  if (isSuccess) reset();

  const onSubmit = (data: FormData) => {
    console.log("ran");
    console.log(data);

    mutate({
      names: data.names.split(","),
      capacity: data.capacity,
      club: data.club,
      latitude: data.latitude,
      longitude: data.longitude,
    });
  };

  return (
    <>
      {/*  eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
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
            className="input-bordered input w-full max-w-xs placeholder:font-thin"
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
            className="input-bordered input w-full max-w-xs placeholder:font-thin"
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
            className="input-bordered input w-full max-w-xs placeholder:font-thin"
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
            className="input-bordered input w-full max-w-xs placeholder:font-thin"
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
            className="input-bordered input w-full max-w-xs placeholder:font-thin"
            {...register("club")}
          />

          {errors.club?.message && (
            <p className="mt-2 text-error">{errors.club?.message}</p>
          )}
        </div>

        {!isLoading ? (
          <button type="submit" className="btn-primary btn-wide btn mt-5">
            Add stadium
          </button>
        ) : (
          <button className="btn-disabled btn-wide btn mt-5">
            <LoadingSpinner />
          </button>
        )}
      </form>
    </>
  );
}
