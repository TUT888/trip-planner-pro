import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";

import { AppLogo } from "./Logo";
import { DesktopNav, MobileNav } from "./Navbar";
import { UserMenu } from "@/features/auth/UserMenu";
import { TripSelector } from "@/features/trip/components/TripSelector";
import { AuthForm } from "@/features/auth/AuthForm";

export function Header() {
  const user = {
    name: "Nguyen Van A",
    email: "abc@gmail.com",
  };
  const [navMenuOpen, setnavMenuOpen] = useState(false);
  const [authFormOpen, setAuthFormOpen] = useState(false);

  // Return Login/Register if user not existed
  if (!user) {
    return (
      <header className="sticky top-0 z-50 bg-gray-50 shadow-md">
        <div className="flex justify-between items-center px-4 py-3">
          <AppLogo />
          <Button onClick={() => setAuthFormOpen(true)} variant="outline">
            Account
          </Button>
          <AuthForm open={authFormOpen} onOpenChange={setAuthFormOpen} />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-gray-50 shadow-md">
      <div className="flex justify-between items-center px-4 py-3">
        {/* Logo and mobile nav option */}
        <div className="flex items-center">
          <AppLogo />
          <Button
            variant="ghost"
            className="md:hidden rounded-full"
            onClick={() => setnavMenuOpen((prev) => !prev)}
          >
            {navMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Desktop nav (shown on medium screen) */}
        <div className="hidden md:flex">
          <DesktopNav />
        </div>

        {/* Trips and User Menu */}
        <div className="flex items-center gap-1">
          <TripSelector />
          <UserMenu user={user} />
        </div>
      </div>

      {/* Open mobile menu */}
      {navMenuOpen && <MobileNav onClose={() => setnavMenuOpen(false)} />}
    </header>
  );
}
