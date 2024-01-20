import "./App.css";
import { useEffect, useState } from "react";
import supabase from "./supabaseClient";
import { Outlet } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import SettingsButton from "./components/buttons/Settings";
import ProfileButton from "./components/buttons/ProfileButton"

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
      <nav className="flex text-xl font-semibold p-4 justify-between">
        <SettingsButton />
        <div className="flex gap-4 items-center">
          {session ? (
            <>
              <ProfileButton />
            </>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </div>
      </nav>
      <main className=" w-[calc(min(100vw-20px,1050px))] mx-auto">
        <Outlet />
      </main>
    </>
  );
}
