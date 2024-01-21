import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { FaUser } from "react-icons/fa";

export default function SettingsButton() {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    window.localStorage.clear();
    await navigate({ to: "/", replace: true });
    window.location.reload();
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const menuStyle = {
    position: "absolute",
    right: isClicked ? "4rem" : "0",
    top: "0.7rem",
    transition: `right 0.3s ease-out, opacity 0.5s ${
      isClicked ? "0.1s" : "-0.2s"
    } ease`,
    opacity: isClicked ? 1 : 0,
    pointerEvents: isClicked ? "auto" : "none",
  };
  const menuStyle2 = {
    position: "absolute",
    right: isClicked ? "4rem" : "0",
    top: "3rem",
    transition: `right 0.6s ease-out, opacity 0.5s ${
      isClicked ? "0.3s" : "0.1s"
    } ease`,
    opacity: isClicked ? 1 : 0,
    pointerEvents: isClicked ? "auto" : "none",
  };
  const menuStyle3 = {
    position: "absolute",
    right: isClicked ? "4rem" : "0",
    top: "6.3rem",
    transition: `right 0.9s ease-out, opacity 0.5s ${
      isClicked ? "0.6s" : "0.2s"
    } ease`,
    opacity: isClicked ? 1 : 0,
    pointerEvents: isClicked ? "auto" : "none",
  };
  const menuStyle4 = {
    position: "absolute",
    right: isClicked ? "4rem" : "0",
    top: "9.7rem",
    transition: `right 1.2s ease-out, opacity 0.5s ${
      isClicked ? "0.9s" : "0.3s"
    } ease`,
    opacity: isClicked ? 1 : 0,
    pointerEvents: isClicked ? "auto" : "none",
  };
  return (
    <div className="flex items-center z-10">
      <div className="relative">
        <button
          className="bg-transparent border-2 text-white font-bold rounded-full h-12 w-12 flex items-center justify-center"
          onClick={handleClick}
        >
          <FaUser />
        </button>
        <div>
          <div style={menuStyle}>
            <a
              className="w-min border-2 rounded-full border-white py-1 px-6 text-2xl tracking-wider transition-all duration-300 ease-in-out hover:px-10 cursor-pointer"
            >
              Profil
            </a>
          </div>
          <div style={menuStyle2} className="mt-3">
            <a className="w-min border-2 rounded-full border-white py-1 px-6 text-2xl tracking-wider transition-all duration-300 ease-in-out hover:px-10 whitespace-nowrap cursor-pointer">
              <Link to={"/create"}>Lag Post</Link>
            </a>
          </div>
          <div style={menuStyle3} className="mt-2">
            <a className="w-min border-2 rounded-full border-white py-1 px-6 text-2xl tracking-wider transition-all duration-300 ease-in-out hover:px-10 cursor-pointer">
              Innstillinger
            </a>
          </div>
          <div style={menuStyle4}>
            <button
              onClick={handleLogout}
              className="w-min border-2 rounded-full border-white py-1 px-6 text-2xl tracking-wider transition-all duration-300 ease-in-out hover:px-10 whitespace-nowrap"
            >
              Logg ut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
