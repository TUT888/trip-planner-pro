import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function AppLayout() {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-[#fef7ff]">
      <Header />
      <main className="flex-1 flex flex-col px-3 py-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}