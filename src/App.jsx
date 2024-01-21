import "./App.css";
import { useEffect, useState } from "react";
import supabase from "./supabaseClient";
import { Outlet } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import SettingsButton from "./components/buttons/Settings";
import ProfileButton from "./components/buttons/ProfileButton";
import Footer from "./components/footer/Footer";

import SearchBar from "./components/search";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  return (
    <>
      <nav className="flex text-xl font-semibold p-4 justify-between w-full">
        <SettingsButton />

        <div className="flex gap-4 top-5 right-3 items-center fixed">
          {session ? (
            <>
              <ProfileButton />
            </>
          ) : (
            <Link to="/login">
              <div className="relative me-4 group cursor-pointer overflow-hidden">
                <div className="px-4 pb-1 text-white">Login</div>
                <div className="absolute bottom-0 left-0 bg-white h-0.5 w-0 transform origin-left transition-all duration-300 group-hover:w-full"></div>
              </div>
            </Link>
          )}
        </div>
      </nav>
      <main className=" w-[calc(min(100vw-20px,1320px))] mx-auto">
        <SearchBar></SearchBar>
        <Outlet />
      </main>
      <footer className="w-[calc(min(100vw-20px,1320px))] mx-auto">
        <Footer />
      </footer>
    </>
  );
}
