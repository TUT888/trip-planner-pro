import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";

import { AppLogo } from "./Logo";
import { DesktopNav, MobileNav } from "./Navbar";
import { UserMenu } from "@/features/auth/components/UserMenu";
import { TripSelector } from "@/features/trip/components/TripSelector";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { clearAuthError, logout } from "@/features/auth/authSlice";
import { loginUser, registerUser } from "@/features/auth/authThunks";
import { selectAuthError, selectCurrentUser, selectIsAuthLoading } from "@/features/auth/authSelector";

export function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);
  const isAuthLoading = useSelector(selectIsAuthLoading);
  const authError = useSelector(selectAuthError);
  
  const [navMenuOpen, setnavMenuOpen] = useState(false);
  const [loginFormOpen, setLoginFormOpen] = useState(false);
  const [registerFormOpen, setRegisterFormOpen] = useState(false);

  const openLoginForm = () => {
    dispatch(clearAuthError());
    setLoginFormOpen(true);
  };

  const openRegisterForm = () => {
    dispatch(clearAuthError());
    setRegisterFormOpen(true);
  };

  const handleLogin = (loginData) => {
    // unwrap allows us to extract the payload on success, 
    // or throw error if rejected
    dispatch(loginUser(loginData))
      .unwrap()
      .then(() => navigate("/"))
      .catch(() => {});
  };

  const handleRegister = (registerData) => {
    // unwrap allows us to extract the payload on success, 
    // or throw error if rejected
    dispatch(registerUser(registerData))
      .unwrap()
      .then(() => navigate("/"))
      .catch(() => {});
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // Return Login/Register if user not existed
  if (!user) {
    return (
      <header className="sticky top-0 z-50 bg-gray-50 shadow-md">
        <div className="flex justify-between items-center px-4 py-3">
          <AppLogo />
          <div className="space-x-2">
            <Button onClick={openLoginForm} variant="outline">
              Login
            </Button>
            <Button onClick={openRegisterForm} variant="outline">
              Register
            </Button>
          </div>
        </div>

        {loginFormOpen && (
          <LoginForm
            isOpen={loginFormOpen}
            onClose={() => setLoginFormOpen(false)}
            onSubmit={handleLogin}
            isSubmitting={isAuthLoading}
            error={authError}
          />
        )}

        {registerFormOpen && (
          <RegisterForm
            isOpen={registerFormOpen}
            onClose={() => setRegisterFormOpen(false)}
            onSubmit={handleRegister}
            isSubmitting={isAuthLoading}
            error={authError}
          />
        )}
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
          <UserMenu user={user} onLogout={handleLogout} />
        </div>
      </div>

      {/* Open mobile menu */}
      {navMenuOpen && (
        <MobileNav onClose={() => setnavMenuOpen(false)} />
      )}
    </header>
  );
}
