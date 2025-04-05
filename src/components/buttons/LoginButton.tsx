"use client";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

import Button from "@/components/buttons/Button";

export default function LoginButton() {
    return (
        <Button
            label="Sign In"
            onClick={() => signIn("github")}
            variant="primary"
        ><Github className="icon" /></Button>
    )
}