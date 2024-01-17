import MoodSquare from "../creatlisting/MoodSquare";

export default function CreateListing() {
  return (
    <div className="flex flex-col justify-center items-center max-w-5xl mx-auto">
      <div className="items-start">
        <h1 className="text-4xl  mb-4">Create Listing</h1>
        <p className="text-xs w-2/3">
          Trenger du en artist, band eller DJ til ditt bryllup, firmafest,
          privatfest eller annet arrangement? Få uforpliktende svar fra artister
          som passer til oppdraget! Bare fyll ut skjemaet under, så gir vi de
          beskjed og dere kan forhandle videre! Fyll ut mest mulig detaljert,
          slik at artistene kan vurdere best mulig om dette er noe for dem.
        </p>
        <div className="flex">
          <h2 className="text-2xl mt-4 border-b-2 pb-2 ps-1 pe-6">Informasjon</h2>
        </div>

        <div className="flex mt-4 justify-between">
          <div>
            <input
              type="text"
              id="name"
              placeholder="Ditt Navn"
              className="ps-1 py-1 pe-12 bg-transparent border-b-2 border-gray-600 text-white placeholder-gray-600 focus:outline-none cursor-pointer transition-all duration-300 ease-in-out hover:border-white"
            />
          </div>

          <div>
            <input
              type="email"
              id="email"
              placeholder="E-post"
              className="ps-1 py-1 pe-12 bg-transparent border-b-2 border-gray-600 text-white placeholder-gray-600 focus:outline-none cursor-pointer transition-all duration-300 ease-in-out hover:border-white"
            />
          </div>

          <div>
            <input
              type="text"
              id="location"
              placeholder="Sted"
              className="ps-1 py-1 pe-12 bg-transparent border-b-2 border-gray-600 placeholder-gray-600 focus:outline-none cursor-pointer transition-all duration-300 ease-in-out hover:border-white"
            />
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <div className="mt-5 cursor-pointer">
            <p className="ps-1 py-1 pe-28 text-2xl text-gray-600 border-b-2 border-gray-600 transition-all duration-300 ease-in-out hover:border-white">
              Tittel på Prosjekter
            </p>
          </div>

          <div className="mt-6 mr-16 cursor-pointer">
            <p className="ps-1 py-1 pe-12 text-gray-600 border-b-2 border-gray-600 transition-all duration-300 ease-in-out hover:border-white">
              Sjanger
            </p>
          </div>

          <div className="mt-6 mr-16">
            <p className="ps-1 py-1 px-12 text-gray-600 border-b-2 border-gray-600">
              Tags
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col">
          <label htmlFor="description" className="ps-1 py-1 mb-2 text-gray-600">
            Beskrivelse
          </label>
          <textarea
            id="description"
            rows="4"
            className="w-2/4 bg-transparent border-2 border-gray-600 p-2 focus:outline-none transition-all duration-300 ease-in-out hover:border-white cursor-pointer"
          ></textarea>
        </div>
      </div>
      <h2 className="text-2xl my-4 items-center border-b-2 pb-2 px-6">
        Moodboard
      </h2>
      <MoodSquare />
    </div>
  );
}
