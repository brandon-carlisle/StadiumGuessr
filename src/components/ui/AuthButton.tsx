import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <button className="btn-disabled btn-sm btn md:btn-md">Sign in</button>
    );
  }

  return (
    <>
      {!session ? (
        <button
          onClick={() => void signIn("discord")}
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
