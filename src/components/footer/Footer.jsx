import { FaFacebook, FaInstagram, FaArrowRight } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between border-x border-white">
        <div className="flex flex-col flex-1 p-6 border-r">
          <h1 className="text-center text-xl border-b-2 pb-2">
            Om Filmplassen
          </h1>
          <p className="text-xs text-center mt-4">
            Velkommen til Filmplassen.no - din ultimate destinasjon for
            filmglede! Utforsk vårt brede utvalg av filmer, fra spennende nye
            utgivelser til tidløse klassikere. La deg inspirere, oppdag, og del
            filmopplevelser med vårt filmfellesskap. Bli en del av Filmplassen
            og nyt en verden av film magi!
          </p>
        </div>
        <div className="flex flex-col text-center flex-1 p-6">
          <h1 className=" text-xl border-b-2 pb-2">Kontakt Oss</h1>
          <div className="flex justify-center gap-4 mt-8">
            <FaFacebook size={25} />
            <FaInstagram size={28} />
          </div>
          <p className="text-xs mt-12">2023 Filmplassen AS</p>
        </div>
        <div className="flex flex-col flex-1 p-6 border-l">
          <h1 className="text-center text-xl border-b-2 pb-2">Nyhetsbrev</h1>
          <div className="flex mt-8 gap-4">
            <div className=" py-2">
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full p-2 border bg-transparent text-sm"
              />
            </div>

            <div className="flex text-center text-sm border-b-2 px-2 h-8 mt-3">
              <p>Sign up</p>
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center ml-4">
                <FaArrowRight size={10} color="#333" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
