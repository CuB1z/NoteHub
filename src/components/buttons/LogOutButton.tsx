"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import Button from "@/components/buttons/Button";
import { clearStoredCache } from "@/services/CacheService";

export default function LogOutButton() {
    const onClick = () => {
        clearStoredCache();
        signOut({ callbackUrl: "/" });
    }
    
    return (
        <Button
            label="Log Out"
            onClick={onClick}
            variant="secondary"
        ><LogOut className="icon" /></Button>
    )
}