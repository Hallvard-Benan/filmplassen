import { FaArrowRight } from "react-icons/fa";
import MoodSquare from "../components/creatlisting/MoodSquare";
import supabase from "../supabaseClient";

export default function CreateListingPage() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Extracting all form values
    const title = formData.get("projectTitle");
    const description = formData.get("description");
    const category = formData.get("category");
    const name = formData.get("name");
    const location = formData.get("location");
    const email = formData.get("email");
    const ends_at = formData.get("ends_at");
    // Extracting tags into an array
    const tags = Array.from({ length: 6 }, (_, i) =>
      formData.get(`tag${i + 1}`)
    ).filter(Boolean);

    // Extracting media into an array
    const media = Array.from({ length: 6 }, (_, i) =>
      formData.get(`media${i + 1}`)
    ).filter(Boolean);

    const thumbnail = media[0];

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
    console.log(
      "title: " + title,
      "name: " + name,
      "description: " + description,
      "tags: " + tags,
      "media: " + media,
      "ends_at" + ends_at,
      "category :" + category,
      "email: " + email,
      "location:" + location,
      "thumbnail: " + thumbnail
    );

    // Insert data into the 'post' table
    try {
      const { data, error } = await supabase.from("post").insert([
        {
          title,
          name,
          contact_email: email,
          description,
          genre: category,
          thumbnail,
          location,
          tags,
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center max-w-5xl mx-auto"
    >
      <div className="items-start">
        <div className="flex">
          <h1 className="text-4xl mb-4 border-b-2 pb-6 ps-1 pe-6">
            Create Listing
          </h1>
        </div>
        <p className="text-xs w-2/3 mt-2 mb-6">
          Trenger du en artist, band eller DJ til ditt bryllup, firmafest,
          privatfest eller annet arrangement? Få uforpliktende svar fra artister
          som passer til oppdraget! Bare fyll ut skjemaet under, så gir vi de
          beskjed og dere kan forhandle videre! Fyll ut mest mulig detaljert,
          slik at artistene kan vurdere best mulig om dette er noe for dem.
        </p>
        <div className="flex">
          <h2 className="text-2xl my-4 border-b-2 pb-4 ps-1 pe-6">
            Informasjon
          </h2>
        </div>

        <div className="flex mt-4 justify-between">
          <div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Ditt Navn"
              className="ps-1 py-1 pe-12 bg-transparent border-b-2 border-gray-600 text-white placeholder-gray-600 focus:outline-none cursor-pointer transition-all duration-300 ease-in-out hover:border-white"
            />
          </div>

          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="E-post"
              className="ps-1 py-1 pe-12 bg-transparent border-b-2 border-gray-600 text-white placeholder-gray-600 focus:outline-none cursor-pointer transition-all duration-300 ease-in-out hover:border-white"
            />
          </div>

          <div>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Sted"
              className="ps-1 py-1 pe-12 bg-transparent text-white border-b-2 border-gray-600 placeholder-gray-600 focus:outline-none cursor-pointer transition-all duration-300 ease-in-out hover:border-white"
            />
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <div className="mt-5 cursor-pointer">
            <input
              type="text"
              id="projectTitle"
              name="projectTitle"
              placeholder="Tittel på Prosjektet"
              className="ps-1 py-1 pe-28 text-2xl text-white placeholder-gray-600 bg-transparent border-b-2 border-gray-600 focus:outline-none transition-all duration-300 ease-in-out hover:border-white cursor-pointer"
            />
          </div>

          <div className="mt-6 mr-16 cursor-pointer">
            <select
              type="text"
              id="category"
              name="category"
              defaultValue="Kategori"
              className="ps-1 py-1 pe-12 text-white placeholder-gray-600 bg-transparent border-b-2 border-gray-600 focus:outline-none transition-all duration-300 ease-in-out hover:border-white cursor-pointer"
            >
              <option value="">Velg Kategori:</option>
              <option value="kortfilm">Kortfilm</option>
              <option value="musikkvideo">Musikkvideo</option>
              <option value="dokumentar">Dokumentar</option>
              <option value="spillefilm">Spillefilm</option>
            </select>
          </div>

          <div className="mt-6 mr-12">
            <p className="py-1 px-12 text-gray-600 border-b-2 border-gray-600">
              Tags
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <div className="w-2/4 flex flex-col">
            <label
              htmlFor="description"
              className="ps-1 py-1 mb-2 text-gray-600"
            >
              Beskrivelse
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="w-full bg-transparent border-2 border-gray-600 p-2 focus:outline-none transition-all duration-300 ease-in-out hover:border-white cursor-pointer"
            ></textarea>
          </div>

          <div className="ml-4 flex flex-col space-y-2">
            <div className="flex space-x-2">
              <input
                name="tag1"
                type="text"
                className="w-28 h-10 bg-transparent border border-gray-600 text-white transition-all duration-300 ease-in-out hover:border-white cursor-pointer"
              />
              <input
                name="tag2"
                type="text"
                className="w-28 h-10 bg-transparent border border-gray-600 text-white transition-all duration-300 ease-in-out hover:border-white cursor-pointer"
              />
            </div>
            <div className="flex space-x-2">
              <input
                name="tag3"
                type="text"
                className="w-28 h-10 bg-transparent border border-gray-600 text-white transition-all duration-300 ease-in-out hover:border-white cursor-pointer"
              />
              <input
                name="tag4"
                type="text"
                className="w-28 h-10 bg-transparent border border-gray-600 text-white transition-all duration-300 ease-in-out hover:border-white cursor-pointer"
              />
            </div>
            <div className="flex space-x-2">
              <input
                name="tag5"
                type="text"
                className="w-28 h-10 bg-transparent border border-gray-600 text-white transition-all duration-300 ease-in-out hover:border-white cursor-pointer"
              />
              <input
                name="tag6"
                type="text"
                className="w-28 h-10 bg-transparent border border-gray-600 text-white transition-all duration-300 ease-in-out hover:border-white cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl mt-16 mb-4 items-center border-b-2 pb-2 px-6">
        Moodboard
      </h2>
      <div className="flex gap-8 justify-between mt-8">
        <MoodSquare name={"media1"} />
        <MoodSquare name={"media2"} />
        <MoodSquare name={"media3"} />
      </div>
      <div className="flex gap-8 justify-between mt-8">
        <MoodSquare name={"media4"} />
        <MoodSquare name={"media5"} />
        <MoodSquare name={"media6"} />
      </div>
      <div className="mt-8 grid gap-4">
        <label
          htmlFor="ends_at"
          className="text-xl  mb-4 items-center border-b-2 pb-2 px-6"
        >
          Forventet prosjektslutt:{" "}
        </label>
        <input
          type="date"
          id="ends_at"
          name="ends_at"
          placeholder="ends_at"
          className="invert border-gray-600 border-2 p-2 text-lg"
        />
      </div>
      <div className="flex items-center justify-center pb-4 px-6 mt-16 mb-8 border-b-2 border-gray-600 cursor-pointer transition-all duration-300 ease-in-out hover:border-white">
        <button
          type="submit"
          className="ps-1 pe-2 text-2xl text-white placeholder-gray-600 bg-transparent focus:outline-none cursor-pointer transition-all duration-300 ease-in-out hover:border-white"
        >
          Create Listing
        </button>
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center ml-4">
          <FaArrowRight size={16} color="#333" />
        </div>
      </div>
    </form>
  );
}
