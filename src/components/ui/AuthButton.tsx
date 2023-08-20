import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import normal from "public/auth/normal.png";

import LoadingSpinner from "./LoadingSpinner";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {!session ? (
        <div className="flex items-center justify-center gap-3">
          <button onClick={() => void signIn("google")}>
            <Image
              src={normal}
              alt="google signin icon"
              className="block w-full"
            />
          </button>
        </div>
      ) : (
        <button
          onClick={() => void signOut()}
          className="btn-neutral btn w-full"
        >
          <span className="h-5 w-5">
            <SignOutIcon />
          </span>
        </button>
      )}
    </>
  );
}

function SignOutIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path
        d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
      />
    </svg>
  );
}
