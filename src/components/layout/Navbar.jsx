import { Backpack, Calendar, DollarSign, MapPin } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: <MapPin size={18} />},
  { to: "/itinerary", label: "Itinerary", icon: <Calendar size={18} /> },
  { to: "/packing", label: "Packing", icon: <Backpack size={18} /> },
  { to: "/budget", label: "Budget", icon: <DollarSign size={18} /> },
];

export function DesktopNav() {
  return (
    <nav>
      {navLinks.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
        >
          {({ isActive }) => (
            <Button variant={ isActive ? "default" : "ghost"}>
            <span>{icon}</span>
            <span>{label}</span>
          </Button>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

export function MobileNav({ onClose }) {
  return (
    <nav className="md:hidden flex flex-col px-4 pb-4 gap-3 bg-gray-50">
      {navLinks.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={() => onClose()}
        >
          {({ isActive }) =>
            <div className={cn(
              "flex items-center gap-3 hover:text-primary",
              isActive ? "font-bold text-primary" : "hover:text-primary"
            )}>
              <span>{icon}</span>
              <span className="text-md">{label}</span>
            </div>
          }
        </NavLink>
      ))}
    </nav>
  )
}