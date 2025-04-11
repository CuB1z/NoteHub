"use client";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

import Button from "@/components/buttons/Button";

export default function LoginButton() {
    const onClick = () => {
        signIn("github");
    }

    return (
        <Button
            label="Sign In"
            onClick={onClick}
            variant="primary"
        ><Github className="icon" /></Button>
    )
}