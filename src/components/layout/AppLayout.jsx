import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function AppLayout() {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Header />
      <main className="px-3 py-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}