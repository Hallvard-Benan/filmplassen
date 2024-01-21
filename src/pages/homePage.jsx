import { useEffect, useState } from "react";
import ImageSlider from "../components/herosection/ImageSlider";

import Posts from "../components/Posts";
import supabase from "../supabaseClient";
import HeroCategories from "../components/herosection/HeroCategories"
function HomePage() {
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
        <div className="relative w-[calc(min(100vw-20px,1050px))] h-[550px] mx-auto">
          <ImageSlider />
        </div>
        <HeroCategories />
        <div className="text-white bg-black  mx-auto">
          {" "}
          <Posts></Posts>
        </div>
      </div>
    );
  } else {
    return <Posts></Posts>;
  }
}

export default HomePage;
