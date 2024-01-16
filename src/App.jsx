import "./App.css";
import { useEffect, useState } from "react";
import supabase from "./supabaseClient";
import { Outlet } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

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
        <Link to={"/"}>Home</Link>
        <div className="flex gap-4">
          <Link to={"/create"}>Create</Link>
          {session ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
}
