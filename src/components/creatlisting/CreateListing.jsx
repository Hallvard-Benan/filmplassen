import MoodSquare from "../creatlisting/MoodSquare"

export default function CreateListing() {
  return (
    <div className="flex flex-col justify-center items-center max-w-5xl mx-auto">
      <div className="items-start">
        <h1 className="text-4xl font-bold mb-4">Create Listing</h1>
        <p className="text-sm">
          Trenger du en artist, band eller DJ til ditt bryllup, firmafest,
          privatfest eller annet arrangement? Få uforpliktende svar fra artister
          som passer til oppdraget! Bare fyll ut skjemaet under, så gir vi de
          beskjed og dere kan forhandle videre! Fyll ut mest mulig detaljert,
          slik at artistene kan vurdere best mulig om dette er noe for dem.
        </p>
        <h2 className="text-2xl font-bold mt-4">Informasjon</h2>

        <div className="flex mt-4">
          <div className="mr-4">
            <label htmlFor="name" className="text-sm font-semibold">
              Ditt Navn
            </label>
            <input type="text" id="name" className="border p-2" />
          </div>

          <div className="mr-4">
            <label htmlFor="email" className="text-sm font-semibold">
              E-post
            </label>
            <input type="email" id="email" className="border p-2" />
          </div>

          <div>
            <label htmlFor="location" className="text-sm font-semibold">
              Sted
            </label>
            <input type="text" id="location" className="border p-2" />
          </div>
        </div>

        <div className="flex mt-4">
          <div className="mr-4">
            <p className="text-sm font-semibold">Tittel på Prosjekter</p>
          </div>

          <div className="mr-4">
            <p className="text-sm font-semibold">Sjanger</p>
          </div>

          <div>
            <p className="text-sm font-semibold">Tags</p>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="description" className="text-sm font-semibold">
            Description
          </label>
          <textarea
            id="description"
            rows="4"
            className="w-full border p-2"
          ></textarea>
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-4 items-center">Moodboard</h2>
      <MoodSquare />
    </div>
  );
}
