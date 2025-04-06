"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import Button from "@/components/buttons/Button";

export default function LogOutButton() {
    return (
        <Button
            label="Log Out"
            onClick={() => signOut({ callbackUrl: "/" })}
            variant="secondary"
        ><LogOut className="icon" /></Button>
    )
}