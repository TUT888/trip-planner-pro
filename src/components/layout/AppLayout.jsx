import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { GuestWelcomeCard } from "@/features/auth/components/GuestWelcomeCard";
import { selectCurrentUser } from "@/features/auth/authSelector";

export function AppLayout() {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="flex flex-col justify-between min-h-screen bg-secondary/30">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-start mx-auto w-full md:w-4/5 px-3 py-3">
        {user ? <Outlet /> : <GuestWelcomeCard />}
      </main>
      <Footer />
    </div>
  );
}
