"use client";

import { signIn } from "next-auth/react";

import Button from "@/components/buttons/Button";

export default function LoginButton() {
    return (
        <Button
            icon="/assets/icons/github.svg"
            label="Sign In"
            onClick={() => signIn("github")}
            variant="primary"
        />
    )
}