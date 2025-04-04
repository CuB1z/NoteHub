"use client";

import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";

interface LoginClientProps {
  session: Session | null;
}

export default function LoginClient({ session }: LoginClientProps) {
  return (
    <div>
      {session ? (
        <>
          <p>Welcome, {session.user?.name}!</p>
          <p>{JSON.stringify(session, null, 2)}</p>
          <button
            onClick={() => signOut()}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Sign out
          </button>
        </>
      ) : (
        <div>
          <h1>Login</h1>
          <p>Please sign in to access the application.</p>
          <button
            onClick={() => signIn("github")}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Sign in with GitHub
          </button>
        </div>
      )}
    </div>
  );
}