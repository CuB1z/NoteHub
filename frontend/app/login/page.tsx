"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <p>Welcome, {session.user?.name}!</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <button onClick={() => signIn("github")}>Sign in with GitHub</button>
      )}
    </div>
  );
}