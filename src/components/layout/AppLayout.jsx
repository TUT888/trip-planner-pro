import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function AppLayout() {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-[#fef7ff]">
      <Header />
      <main className="px-3 py-5 flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}