import { useState, useEffect, useRef } from "react";
import supabase from "../../supabaseClient";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "@tanstack/react-router";
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

  const handleDeletePost = async (postId, userId) => {
    try {
      if (user === userId) {
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
    const media = formData
      .get("media")
      .split(",")
      .map((item) => item.trim());
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
      const { data, error } = await supabase
        .from("post")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        setError(error);
      }
      setPosts(data);
    }
    fetchPosts();
  }, []);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid w-[calc(min(100vw-20px,1050px))] mx-auto border-b-2 border-x-2  ">
      {posts.map((post, index) => (
        <div
          key={index}
          className={`border-t-2 py-4 px-6 md:flex gap-4 ${
            index % 2 === 0 && "flex-row-reverse"
          }`}
        >
          <div
            className={`flex flex-col justify-between flex-1 ${
              index % 2 === 0 && "text-end items-end"
            }`}
          >
            <div className="grid gap-4">
              <div className="">
                <h2 className="text-3xl font-medium">{post.title}</h2>
                <div
                  className={` flex ${index % 2 === 0 && "flex-row-reverse"}`}
                >
                  <p className="border-2 w-min px-2 text-sm mt-1">
                    {post.genre}
                  </p>
                </div>
              </div>
              <p className="text-sm">Postet {formatDate(post.created_at)}</p>

              <p className="text-sm">{post.description}</p>
            </div>
            <div
              className={`flex gap-2 ${
                index % 2 === 0 && "flex-row-reverse"
              } items-end`}
            >
              <Link
                to={`/listing?id=${post.id}`}
                className="border-b text-lg px-1"
              >
                <div className="transition-transform duration-300 transform hover:translate-x-3 inline-block">
                  {"Se Prosjektet "}
                  <span className="">{"->"}</span>
                </div>
              </Link>
              {user === post.user && (
                <div className="flex">
                  <button
                    onClick={() => handleDeletePost(post.id, post.user)}
                    className=" p-2 text-red-500 text-2xl"
                  >
                    <MdDelete />
                  </button>
                  <button
                    onClick={() => openModal(post.id)}
                    className="p-2 text-blue-500 text-2xl"
                  >
                    <FaEdit />
                  </button>
                </div>
              )}
            </div>
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
                    defaultValue={post.media}
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
          <div className="flex-1">
            <img
              src={
                post.thumbnail
                  ? post.thumbnail
                  : "https://images.squarespace-cdn.com/content/v1/614b7b9bb907e533422f0fa4/1632345033501-2NH1SZ5U86NSJDGNS6X3/image-asset.jpeg"
              }
              alt=""
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
