import Link from "next/link";

export default function Unauthorised() {
  return (
    <div className="grid h-screen w-screen place-items-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-3xl font-semibold">You are not allowed here...</h1>
        <Link href={"/"} className="btn-md btn">
          Go home
        </Link>
      </div>
    </div>
  );
}
