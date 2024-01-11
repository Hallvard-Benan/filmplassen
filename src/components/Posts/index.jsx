import { useState, useEffect } from "react";
import supabase from "../../supabaseClient";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error, status } = await supabase.from("post").select("*");

      if (error) {
        setError(error);
      }
      console.log(data);
      setPosts(data);
    }

    fetchPosts();
  }, []);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>{post.title}</div>
      ))}
    </div>
  );
}

export default Posts;
