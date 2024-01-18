import { useState } from "react";
import { TfiPlus } from "react-icons/tfi";
import { FaX, FaCheck } from "react-icons/fa6";

export default function MoodSquare({ name }) {
  const [open, setOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);
  const [url, setUrl] = useState("");
  return (
    <div
      onClick={() => {
        if (!open) setOpen(true);
      }}
      className={`w-48 h-28 border-2 border-gray-600 relative flex items-center justify-center cursor-pointer group transition-all duration-300 ease-in-out hover:border-white group-hover:border-white ${
        open && " scale-110"
      }`}
    >
      <div className="grid">
        <input
          name={name}
          id={name}
          placeholder="image url"
          className={`border-b-[1px] border-slate-400 text-white bg-black ${
            !open && "hidden"
          }`}
          type="text"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <div
          className={`flex justify-between text-xl pt-2 ${!open && "hidden"}`}
        >
          <button
            type="button"
            onClick={() => {
              setOpen(false);
            }}
          >
            <FaX />
          </button>
          <button
            type="button"
            onClick={() => {
              setImageOpen(true);
              setOpen(false);
            }}
          >
            <FaCheck />
          </button>
        </div>
      </div>
      <TfiPlus
        size={48}
        className={`text-gray-600 transition-all duration-300 ease-in-out group-hover:text-white ${
          (open || imageOpen) && "hidden"
        }`}
      />
      {imageOpen && (
        <button
          className="text-4xl absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 hover:text-red-500"
          type="button"
          onClick={() => {
            setImageOpen(false);
          }}
        >
          x
        </button>
      )}

      <img
        src={url}
        alt=""
        className={` max-h-full ${!imageOpen && "hidden"}`}
      />
    </div>
  );
}
