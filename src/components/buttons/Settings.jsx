import { useState } from "react";
import { Link } from "@tanstack/react-router";
export default function SettingsButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const getDotStyle = (index) => {
    if (index === 2) {
      return {
        transform: isHovered ? "translateY(5px)" : "translateY(0)",
        transition: "transform 0.3s ease",
      };
    } else if (index === 0) {
      return {
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        transition: "transform 0.3s ease",
      };
    }
    return {};
  };

  const menuStyle = {
    position: "absolute",
    left: isClicked ? "4rem" : "0",
    top: "0.7rem",
    transition: `left 0.3s ease-out, opacity 0.5s ${
      isClicked ? "0.1s" : "-0.2s"
    } ease`, // Adjust the delay for visibility
    opacity: isClicked ? 1 : 0,
    pointerEvents: isClicked ? "auto" : "none",
  };
  const menuStyle2 = {
    position: "absolute",
    left: isClicked ? "4rem" : "0",
    top: "3rem",
    transition: `left 0.6s ease-out, opacity 0.5s ${
      isClicked ? "0.3s" : "0.1s"
    } ease`, // Adjust the delay for visibility
    opacity: isClicked ? 1 : 0,
    pointerEvents: isClicked ? "auto" : "none",
  };
  const menuStyle3 = {
    position: "absolute",
    left: isClicked ? "4rem" : "0",
    top: "6.3rem",
    transition: `left 0.9s ease-out, opacity 0.5s ${
      isClicked ? "0.6s" : "0.2s"
    } ease`, // Adjust the delay for visibility
    opacity: isClicked ? 1 : 0,
    pointerEvents: isClicked ? "auto" : "none",
  };
  const menuStyle4 = {
    position: "absolute",
    left: isClicked ? "4rem" : "0",
    top: "9.7rem",
    transition: `left 1.2s ease-out, opacity 0.5s ${
      isClicked ? "0.9s" : "0.3s"
    } ease`, // Adjust the delay for visibility
    opacity: isClicked ? 1 : 0,
    pointerEvents: isClicked ? "auto" : "none",
  };

  return (
    <div className="flex items-center z-10">
      <div className="relative">
        <button
          className="bg-transparent border-2 text-white font-bold rounded-full h-12 w-12"
          onMouseEnter={handleHover}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <div
              className="bg-white h-1 w-1 rounded-full mb-1"
              style={getDotStyle(0)}
            ></div>
            <div
              className="bg-white h-1 w-1 rounded-full mb-1"
              style={getDotStyle(1)}
            ></div>
            <div
              className="bg-white h-1 w-1 rounded-full"
              style={getDotStyle(2)}
            ></div>
          </div>
        </button>
        <div>
          <div style={menuStyle}>
          <Link
            to={"/"}
            className="w-min border-2 rounded-full border-white py-1 px-6 text-2xl tracking-wider"
          >
            Hjem
          </Link>
          </div>
          <div style={menuStyle2} className="w-min border-2 rounded-full border-white py-1 px-6 text-2xl tracking-wider mt-2">
            Kortfilmer
          </div>
          <div style={menuStyle3}  className="w-min border-2 rounded-full border-white py-1 px-6 text-2xl tracking-wider mt-2">
            Filmer
          </div>
          <div style={menuStyle4}  className="w-min border-2 rounded-full border-white py-1 px-6 text-2xl tracking-wider mt-2">
            Musikkvideo
          </div>
        </div>
      </div>
    </div>
  );
}
