import "./App.css";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";
import Posts from "./components/posts";
import supabase from "./supabaseClient";

const handleLogout = () => {
  window.localStorage.clear();
  window.location.reload();
};

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

  if (!session) {
    return (
      <div>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google']}
        />
      </div>
    );
  } else {
    return (
      <div className="grid">
        Logged in!{" "}
        <button
          className="border-2 border-neutral-600  hover:bg-slate-400 px-4 py-2 "
          onClick={handleLogout}
        >
          Logout
        </button>
        <Posts></Posts>
      </div>
    );
  }
}
