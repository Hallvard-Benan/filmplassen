import { useState, useEffect } from "react";
import supabase from "../supabaseClient";

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
    <div>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
    </div>
  );
}

export default ListingPage;
