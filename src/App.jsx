import "./App.css";
import { useEffect, useState } from "react";
import supabase from "./supabaseClient";
import { Outlet } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import SettingsButton from "./components/buttons/Settings";

export default function App() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    window.localStorage.clear();
    await navigate({ to: "/", replace: true });
    window.location.reload();
  };
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
        <div className="flex gap-4">
          {session ? (
            <>
              <Link to={"/create"}>Create</Link>
              <button onClick={handleLogout}>Logout</button>
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
