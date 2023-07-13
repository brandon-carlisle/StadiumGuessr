import { signIn, signOut, useSession } from "next-auth/react";

import LoadingButton from "./LoadingButton";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingButton />;
  }

  return (
    <>
      {!session ? (
        <button
          onClick={() => void signIn("google")}
          className="btn-neutral btn-sm btn md:btn-md"
        >
          Sign in
        </button>
      ) : (
        <button
          onClick={() => void signOut()}
          className="btn-neutral btn-sm btn md:btn-md"
        >
          Sign out
        </button>
      )}
    </>
  );
}
