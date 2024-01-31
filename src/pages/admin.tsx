import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "@/utils/api";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Unauthorised from "@/components/ui/Unauthorised";

export default function AdminPage() {
  const { data: session, status: sessionStatus } = useSession();
  const { data: stadiums, isLoading } = api.stadium.getAll.useQuery();
  const utils = api.useContext();

  const { mutate } = api.stadium.deleteById.useMutation({
    async onSuccess() {
      await utils.stadium.getAll.invalidate();
    },
  });

  if (sessionStatus === "loading")
    return (
      <div className="grid h-screen w-screen place-items-center">
        <LoadingSpinner />
      </div>
    );

  if (!session || session.user.role !== "ADMIN") return <Unauthorised />;

  const handleDelete = (id: string) => {
    if (!confirm(`Are you sure you want to delete this?`)) return;

    mutate({ stadiumId: id });
  };

  return (
    <>
      <Head>
        <title>Admin / StadiumGuessr</title>
        <meta
          name="description"
          content="A football stadium guessing game - challenge your football knowledge"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="mb-3 flex justify-between p-8">
        <h1 className="text-2xl font-semibold md:text-4xl">Admin Panel</h1>
        <Link href={"/"} className="btn-md btn">
          Go home
        </Link>
      </header>
      <main className="px-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <section>
            <h2 className="mb-2 text-xl font-semibold">View all stadiums</h2>
            <p className="mb-5 font-semibold">
              {stadiums?.length} stadiums found
            </p>

            {isLoading && <LoadingSpinner />}

            <div className="flex h-[70vh] flex-col gap-3 overflow-y-auto">
              {!stadiums || !stadiums.length ? (
                <p>No stadiums found...</p>
              ) : (
                stadiums.map((stadium) => (
                  <div
                    key={stadium.id}
                    className="flex flex-col gap-2 rounded-lg bg-neutral-focus p-5"
                  >
                    <div className="flex justify-between">
                      <h3 className="text-lg font-semibold capitalize">
                        {stadium.club}
                      </h3>
                      <button
                        className="btn-error btn-sm btn"
                        onClick={() => void handleDelete(stadium.id)}
                      >
                        Delete
                      </button>
                    </div>
                    <div>
                      <span className="mr-1 font-semibold">
                        Possible names:
                      </span>
                      {stadium.names.map((name) => (
                        <div key={name} className="mr-1 capitalize">
                          {name}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <p className="font-semibold">Lat:</p>
                      <span>{stadium.latitude}</span>
                      <p className="font-semibold">Long:</p>
                      <span>{stadium.longitude}</span>
                    </div>

                    <div className="flex gap-2">
                      <p className="font-semibold">Capacity:</p>
                      <span>{stadium.capacity}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <section>
            <h2 className="mb-5 text-xl font-semibold">Add stadium</h2>
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

function AdminForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const utils = api.useContext();
  const { mutate, isLoading } = api.stadium.create.useMutation({
    async onSuccess() {
      reset();
      await utils.stadium.getAll.invalidate();
    },
  });

  const onSubmit = (data: FormData) => {
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

        <div className="form-control w-full">
          <label className="label" htmlFor="names">
            <span className="label-text">Stadium names seperated by comma</span>
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
