import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "@/utils/api";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Unauthorised from "@/components/ui/Unauthorised";

export default function AdminPage() {
  const { data: session, status: sessionStatus } = useSession();
  const { data: stadiums, isLoading } = api.stadium.getAll.useQuery();

  if (sessionStatus === "loading")
    return (
      <div className="grid h-screen w-screen place-items-center">
        <LoadingSpinner />
      </div>
    );

  if (!session || session.user.role !== "ADMIN") return <Unauthorised />;

  return (
    <>
      <header className="mb-10 flex justify-between p-8">
        <h1 className="text-2xl text-primary-content md:text-4xl">
          Welcome back, {session.user.name}
        </h1>
        <Link href={"/"} className="btn-md btn">
          Go home
        </Link>
      </header>
      <main className="p-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <section>
            <h2 className="mb-5 text-xl font-semibold text-primary-content/90">
              View all stadiums
            </h2>

            {isLoading && <LoadingSpinner />}

            {!stadiums || !stadiums.length ? (
              <p>No stadiums found...</p>
            ) : (
              stadiums.map((stadium) => (
                <div
                  key={stadium.id}
                  className="flex flex-col gap-2 rounded-lg bg-neutral-focus p-5"
                >
                  <h3 className="font-semibold capitalize">{stadium.club}</h3>
                  <div>
                    <span className="mr-1">Possible names:</span>
                    {stadium.names.map((name) => (
                      <span key={name} className="mr-1">
                        {name}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <p>Lat: {stadium.latitude}</p>
                    <p>Long: {stadium.longitude}</p>
                  </div>

                  <p>Capacity: {stadium.capacity}</p>
                </div>
              ))
            )}
          </section>

          <section>
            <h2 className="mb-5 text-xl font-semibold text-primary-content/90">
              Add a new stadium
            </h2>
            <AdminForm />
          </section>
        </div>
      </main>
    </>
  );
}

const schema = z.object({
  names: z.string().min(1),
  capacity: z.string().min(1),
  latitude: z.string().min(1),
  longitude: z.string().min(1),
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
      capacity: Number.parseInt(data.capacity),
      club: data.club,
      latitude: Number.parseFloat(data.latitude),
      longitude: Number.parseFloat(data.longitude),
    });
  };

  return (
    <>
      <form
        //eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-3"
      >
        <div className="form-control w-full">
          <label className="label" htmlFor="names">
            <span className="label-text">
              Stadium names seperated with a comma
            </span>
          </label>
          <input
            id="names"
            type="text"
            placeholder="old trafford,theatre of dreams"
            className="input-bordered input w-full placeholder:font-thin"
            {...register("names")}
          />
          {errors.names?.message && (
            <p className="mt-2 text-error">{errors.names?.message}</p>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label" htmlFor="capacity">
            <span className="label-text">Stadium capacity</span>
          </label>
          <input
            id="capacity"
            type="number"
            placeholder="60000"
            className="input-bordered input w-full placeholder:font-thin"
            {...register("capacity")}
          />
          {errors.capacity?.message && (
            <p className="mt-2 text-error">{errors.capacity?.message}</p>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label" htmlFor="latitude">
            <span className="label-text">Stadium latitude</span>
          </label>
          <input
            id="latitude"
            type="text"
            placeholder="53.463056"
            className="input-bordered input w-full placeholder:font-thin"
            {...register("latitude")}
          />
          {errors.latitude?.message && (
            <p className="mt-2 text-error">{errors.latitude?.message}</p>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label" htmlFor="longitude">
            <span className="label-text">Stadium longitude</span>
          </label>
          <input
            id="longitude"
            type="text"
            placeholder="-2.291389"
            className="input-bordered input w-full placeholder:font-thin"
            {...register("longitude")}
          />
          {errors.longitude?.message && (
            <p className="mt-2 text-error">{errors.longitude?.message}</p>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label" htmlFor="longitude">
            <span className="label-text">Club</span>
          </label>
          <input
            id="club"
            type="text"
            placeholder="Manchester United"
            className="input-bordered input w-full placeholder:font-thin"
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
