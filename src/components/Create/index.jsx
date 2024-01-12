import supabase from "../../supabaseClient";

function PostForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Extracting all form values
    const title = formData.get("title");
    const description = formData.get("description");
    const genre = formData.get("genre");
    const thumbnail = formData.get("thumbnail");
    const media = formData.get("media");
    const ends_at = formData.get("ends_at");

    // Retrieve the user ID from local storage
    const storedData = window.localStorage.getItem(
      "sb-mznnszovluoyourfpvtb-auth-token"
    );
    let userId;
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      userId = parsedData.user.id; // Access the user ID from the parsed object
    }

    // Check if userId is obtained
    if (!userId) {
      console.error("User ID not found");
      return; // Exit the function if no user ID is found
    }

    console.log(userId);

    // Insert data into the 'post' table
    try {
      const { data, error } = await supabase.from("post").insert([
        {
          title,
          description,
          genre,
          thumbnail,
          media,
          ends_at,
          user: userId, // Use the extracted user ID
        },
      ]);

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

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      <div>
        <label htmlFor="title" className="block">
          Title
        </label>
        <input
          type="text"
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
          placeholder="ends_at"
          className="border-2"
        />
      </div>
      <button type="submit" className="bg-green-500 col-span-2">
        Submit succa
      </button>
    </form>
  );
}

export default PostForm;
