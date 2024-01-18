import { useState, useEffect } from "react";
import { FaInstagram } from "react-icons/fa";
import supabase from "../supabaseClient";
import Map from "../assets/Map.svg";
import Image1 from "../assets/Listing-Image1.webp";
import Image2 from "../assets/Listing-Image2.webp";
import Image3 from "../assets/Listing-Image3.jpg";
import Image4 from "../assets/Listing-Image4.jpg";
import Image5 from "../assets/Listing-Image5.jpg";

function ListingPage() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedData = window.localStorage.getItem(
      "sb-mznnszovluoyourfpvtb-auth-token"
    );
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUser(parsedData.user.id);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("id");

    async function fetchPost() {
      const { data, error } = await supabase
        .from("post")
        .select("*")
        .eq("id", postId)
        .single();

      if (error) {
        setError(error);
      }

      setPost(data);
    }

    if (postId) {
      fetchPost();
    }
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto">
      <h1 className="text-4xl border-b pb-4 px-12">{post.title}</h1>
      <p className="mt-8">{post.description}</p>
      <p className="max-w-[300px] text-center mt-12">
        {" "}
        I filmprosjektet "Skyggens Tråder" kastes publikum inn i en dyster
        verden, der en kynisk seriemorder etterlater seg makabre spor inspirert
        av de syv dødssyndene. Et dedikert etterforskerpar, Maria Thorsen og
        Anders Vik, blir tvunget til å navigere gjennom byens dystre underverden
        for å avsløre morderens identitet før han fullfører sitt makabre
        mesterverk.
      </p>
      <div className="flex gap-8 mt-4">
        <div className="flex flex-col">
          <img
            src={Image3}
            alt="Image3"
            className="w-48 h-28 object-cover ms-12"
          />
          <img
            src={Image2}
            alt="Image2"
            className="w-56 h-72 object-cover mt-20"
          />
        </div>
        <div className="flex flex-col gap-12 mt-16">
          <img src={Image1} alt="Image1" className="w-96 h-64 object-cover" />
          <img
            src={Image4}
            alt="Image4"
            className="w-48 h-28 mx-auto object-cover"
          />
        </div>
        <img
          src={Image5}
          alt="Image5"
          className="w-44 h-60 object-cover mt-28"
        />
      </div>
      <p className="max-w-[300px] text-center mt-20">
        Ta gjerne kontakt med meg hvis du har lyst til å diskutere interesser,
        prosjekter eller bare ønsker å dele noen tanker. Jeg ser frem til å høre
        fra dere og forhåpentligvis skape noe fantastisk sammen!
      </p>
      <p className="mt-12">28.03.2023</p>
      <p className="mt-4">Autodesk Flame / Adobe After Effects & Premiere</p>
      <div className="flex flex-col gap-5 items-center mt-12">
        <p>Kontakt meg</p>
        <p>FJELLHAUGVEIEN 83, 0489 OSLO</p>
        <p>info@hallvard.beinhardebenan.no</p>
        <p>03-6910-5067 / 03-6910-5069</p>
        <FaInstagram size={32} className="cursor-pointer" />
      </div>
      <div className="mt-12">
        <img src={Map} alt="Map" />
      </div>
    </div>
  );
}

export default ListingPage;
