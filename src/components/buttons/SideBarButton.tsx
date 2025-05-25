import { ChevronFirstIcon, ChevronLastIcon, PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";
import Button from "@/components/buttons/Button";

type SideBarButtonProps = {
    action: "OPEN" | "CLOSE";
    onToggle: () => void;
}

export default function SideBarButton({ action, onToggle }: SideBarButtonProps) {
    const icon = action === "OPEN" ? <PanelLeftOpenIcon strokeWidth={2} /> : <PanelLeftCloseIcon strokeWidth={2} />;
    return <Button variant="toolUnbordered" onClick={onToggle}>{icon}</Button>;
}