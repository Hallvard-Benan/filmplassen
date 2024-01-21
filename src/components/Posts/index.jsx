import { useState, useEffect, useRef } from "react";
import supabase from "../../supabaseClient";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "@tanstack/react-router";
function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState("");
  const [postFilter, setPostFilter] = useState();
  const modalRefs = useRef({});
  const deleteModalRefs = useRef({});

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
    closeDeleteModal(deleteModalRefs.current[postId]);
    try {
      if (user === userId) {
        console.log("authenticated");
        const { error } = await supabase.from("post").delete().eq("id", postId);
        if (error) {
          console.log(error);
        } else {
          setPosts(posts.filter((post) => post.id !== postId));
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
    const media = Array.from({ length: 6 }, (_, i) =>
      formData.get(`media${i + 1}`)
    ).filter(Boolean);
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

  const openDeleteConfirmation = (postId) => {
    if (deleteModalRefs.current[postId]) {
      deleteModalRefs.current[postId].showModal();
    }
  };

  const closeDeleteModal = (postId) => {
    if (deleteModalRefs.current[postId]) {
      deleteModalRefs.current[postId].close();
    }
  };

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
    const params = new URLSearchParams(window.location.search);
    const filter = params.get("filter");
    const search = params.get("search");
    setPostFilter(filter ? filter : search);

    async function fetchPosts() {
      let query = supabase
        .from("post")
        .select("*")
        .order("created_at", { ascending: false });

      if (filter) {
        query = query.eq("genre", filter);
      }
      if (search) {
        query = query.textSearch("title", search, { type: "websearch" });
      }

      const { data, error } = await query;

      if (error) {
        setError(error);
      }

      setPosts(data);
    }

    fetchPosts();
  }, []);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="w-max mx-auto mt-10">
        <h1 className="text-center text-3xl font-extralight capitalize mb-10 pb-4 px-28 border-b">
          {postFilter ? postFilter : "Alle posts"}
        </h1>
      </div>
      <div className="grid border-b-2 border-x-2">
      <div className="flex gap-1">
        <h1 className="text-3xl font-extralight capitalize mb-2">
          {postFilter ? `Results for: ${postFilter}` : "Alle posts:"}
        </h1>{" "}
        {postFilter && (
          <a href="/" className="text-2xl text-red-300 hover:text-red-400">
            x
          </a>
        )}
      </div>
      <div className="grid border-b-2 border-x-2  ">
        {posts?.length < 1 && "Couldn't find any posts"}
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
                      className=" p-2 text-red-500 text-2xl"
                      onClick={() => openDeleteConfirmation(post.id)}
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
                className=" bg- bg-gray-950 p-8 text-white"
                ref={(el) => (deleteModalRefs.current[post.id] = el)}
              >
                <div className="grid gap-4 ">
                  <h2 className="font-medium text-xl">
                    Permanently delete this post?
                  </h2>
                  <button
                    className="bg-blue-500 px-4 py-2"
                    onClick={() => {
                      closeDeleteModal(post.id);
                      handleDeletePost(post.id, post.user);
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    className="border-2 border-red-500"
                    onClick={() => closeDeleteModal(post.id)}
                  >
                    cancel
                  </button>
                </div>
              </dialog>
              <dialog
                ref={(el) => (modalRefs.current[post.id] = el)}
                className="bg-gray-950 text-white p-4"
              >
                <form
                  onSubmit={(e) => handleUpdate(e, post.id)}
                  className="flex flex-col md:grid md:grid-cols-2 text-left gap-8 min-w-[300px]"
                >
                  <div className="flex flex-col">
                    <label htmlFor="title" className="">
                      Title
                    </label>
                    <input
                      type="text"
                      defaultValue={post.title}
                      id="title"
                      name="title"
                      placeholder="title"
                      className="border-b-2 text-gray-400 bg-transparent border-gray-600 "
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="description" className="">
                      Description
                    </label>
                    <textarea
                      type="text"
                      id="description"
                      defaultValue={post.description}
                      name="description"
                      placeholder="Description"
                      className="border-b-2 text-gray-400 bg-transparent border-gray-600 "
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="genre" className="">
                      Category
                    </label>
                    <select
                      type="text"
                      id="genre"
                      name="genre"
                      value={post.genre}
                      className="ps-1 py-1 pe-12  placeholder-gray-600 bg-transparent border-b-2 border-gray-600 focus:outline-none transition-all duration-300 ease-in-out hover:border-white cursor-pointer"
                    >
                      <option value="kortfilm">Kortfilm</option>
                      <option value="musikkvideo">Musikkvideo</option>
                      <option value="dokumentar">Dokumentar</option>
                      <option value="spillefilm">Spillefilm</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="thumbnail" className="">
                      Thumbnail URL
                    </label>
                    <input
                      type="text"
                      id="thumbnail"
                      defaultValue={post.thumbnail}
                      name="thumbnail"
                      placeholder="thumbnail"
                      className="border-b-2 text-gray-400 bg-transparent border-gray-600 "
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3>Images</h3>
                    {"asdfgh".split("").map((char, index) => (
                      <div key={index}>
                        <label htmlFor={`media${index + 1}`}>
                          {" "}
                          {index + 1}
                        </label>
                        <input
                          name={`media${index + 1}`}
                          className="border-b-2 text-gray-400 bg-transparent border-gray-600 "
                          defaultValue={
                            post.media[index] !== undefined
                              ? post.media[index]
                              : ""
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="ends" className="">
                      End Date
                    </label>
                    <input
                      type="date"
                      id="ends_at"
                      name="ends_at"
                      defaultValue={formatDate(post.ends_at)}
                      placeholder="ends_at"
                      className="border-b-2 invert"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => closeEditModal(post.id)}
                    className="bg-red-500"
                  >
                    Close x
                  </button>
                  <button type="submit" className="bg-green-500">
                    Submit
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
    </div>
  );
}

export default Posts;
