import { TfiPlus } from "react-icons/tfi";

export default function MoodSquare() {
  return (
    <div className="w-48 h-28 border-2 border-gray-600 relative flex items-center justify-center cursor-pointer group transition-all duration-300 ease-in-out hover:border-white group-hover:border-white">
      <TfiPlus
        size={48}
        className="text-gray-600 transition-all duration-300 ease-in-out group-hover:text-white"
      />
    </div>
  );
}
