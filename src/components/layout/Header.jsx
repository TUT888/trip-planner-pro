import { NavLink } from "react-router-dom";
import { Megaphone, User } from "lucide-react";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="flex justify-between items-center px-3 py-5 bg-gray-50">
      <div className="flex gap-12">
        <span className="text-2xl font-bold drop-shadow-sm text-primary">
          Trip Planner Pro
        </span>

        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "font-bold text-primary" : "")}>
          <span className="text-xl hover:text-primary">
            Dashboard
          </span>
        </NavLink>
        <NavLink to="/itinerary" className={({ isActive }) => (isActive ? "font-bold text-primary" : "")}>
          <span className="text-xl hover:text-primary">
            Itinerary
          </span>
        </NavLink>
        <NavLink to="/packing" className={({ isActive }) => (isActive ? "font-bold text-primary" : "")}>
          <span className="text-xl hover:text-primary">
            Packing
          </span>
        </NavLink>
        <NavLink to="/budget" className={({ isActive }) => (isActive ? "font-bold text-primary" : "")}>
          <span className="text-xl hover:text-primary">
            Budget
          </span>
        </NavLink>
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" className="rounded-full">
          <Megaphone />
        </Button>

        <Button variant="ghost" className="rounded-full border-primary m-1">
          <User />
        </Button>
      </div>
    </header>
  )
}