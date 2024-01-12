import { useState, useEffect, useRef } from "react";
import supabase from "../../supabaseClient";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState("");
  const modalRefs = useRef({});

  useEffect(() => {
    const storedData = window.localStorage.getItem(
      "sb-mznnszovluoyourfpvtb-auth-token"
    );
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUser(parsedData.user.id);
    }
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      if (user === postId) {
        console.log("authenticated");
        const { error } = await supabase.from("post").delete().eq("id", postId);
        if (error) {
          console.log(error);
        } else {
          setPosts(posts.filter((post) => post.id !== postId)); // Optimized way to remove the deleted post from state
        }
      } else {
        throw new Error("unauthorized");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const title = formData.get("title");
    const description = formData.get("description");
    const genre = formData.get("genre");
    const thumbnail = formData.get("thumbnail");
    const media = formData.get("media");
    const ends_at = formData.get("ends_at");

    try {
      const { data, error } = await supabase
        .from("post")
        .update([
          {
            title,
            description,
            genre,
            thumbnail,
            media,
            ends_at,
          },
        ])
        .eq("id", id);

      // Handle the response or error
      if (error) {
        console.error("Error inserting data:", error);
      } else {
        window.location.reload();
        console.log("Data inserted successfully:", data);
      }
    } catch (error) {
      console.error("Error in data insertion:", error);
    }
  };

  function formatDate(dateString) {
    if (!dateString) return "";

    // Create a Date object from the dateString
    const date = new Date(dateString);

    // Format the date to yyyy-MM-dd
    return date.toISOString().split("T")[0];
  }

  const openModal = (postId) => {
    if (modalRefs.current[postId]) {
      modalRefs.current[postId].showModal();
    }
  };
  const closeEditModal = (postId) => {
    if (modalRefs.current[postId]) {
      modalRefs.current[postId].close();
    }
  };

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase.from("post").select("*");
      if (error) {
        setError(error);
      }
      setPosts(data);
    }
    fetchPosts();
  }, []);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid gap-4 grid-cols-4">
      {posts.map((post, index) => (
        <div key={index} className="border-2">
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          {user === post.user && (
            <div className="flex justify-between">
              <button
                onClick={() => handleDeletePost(post.id)}
                className="border-2 p-2 border-red-500 text-red-500"
              >
                Delete
              </button>
              <button
                onClick={() => openModal(post.id)}
                className="border-2 p-2 border-blue-500 text-blue-500"
              >
                Edit
              </button>
            </div>
          )}

          <dialog
            ref={(el) => (modalRefs.current[post.id] = el)}
            className="bg-white p-4"
          >
            <form
              onSubmit={(e) => handleUpdate(e, post.id)}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <label htmlFor="title" className="block">
                  Title
                </label>
                <input
                  type="text"
                  defaultValue={post.title}
                  id="title"
                  name="title"
                  placeholder="title"
                  className="border-2"
                />
              </div>
              <div>
                <label htmlFor="description" className="block">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  defaultValue={post.description}
                  name="description"
                  placeholder="Description"
                  className="border-2"
                />
              </div>
              <div>
                <label htmlFor="genre" className="block">
                  Genre
                </label>
                <input
                  type="text"
                  id="genre"
                  defaultValue={post.genre}
                  name="genre"
                  placeholder="Genre"
                  className="border-2"
                />
              </div>
              <div>
                <label htmlFor="thumbnail" className="block">
                  Thumbnail URL
                </label>
                <input
                  type="text"
                  id="thumbnail"
                  defaultValue={post.thumbnail}
                  name="thumbnail"
                  placeholder="thumbnail"
                  className="border-2"
                />
              </div>
              <div>
                <label htmlFor="media" className="block">
                  Media URL
                </label>
                <input
                  type="text"
                  id="media"
                  name="media"
                  defaultValue={`{${post.media}}`}
                  placeholder="media"
                  className="border-2"
                />
              </div>
              <div>
                <label htmlFor="ends" className="block">
                  End Date
                </label>
                <input
                  type="date"
                  id="ends_at"
                  name="ends_at"
                  defaultValue={formatDate(post.ends_at)}
                  placeholder="ends_at"
                  className="border-2"
                />
              </div>
              <button type="submit" className="bg-green-500 col-span-2">
                Submit
              </button>
              <button
                type="button"
                onClick={() => closeEditModal(post.id)}
                className="close-modal"
              >
                Close
              </button>
            </form>
          </dialog>
        </div>
      ))}
    </div>
  );
}

export default Posts;
