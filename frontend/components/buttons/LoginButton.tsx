"use client";

import { signIn } from "next-auth/react";

import Button from "@/components/buttons/Button";

export default function LoginButton() {
    return (
        <Button
            label="Login with GitHub"
            onClick={() => signIn("github")}
            variant="primary"
        />
    )
}