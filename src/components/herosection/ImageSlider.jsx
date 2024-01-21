import Image1 from "../../assets/Image1.png";
import Image2 from "../../assets/Image2.png";
import Image3 from "../../assets/Image3.png";
import Image4 from "../../assets/Image4.png";
import Image5 from "../../assets/Image5.png";
import Image6 from "../../assets/Image6.png";
import Image7 from "../../assets/Image7.png";
import Image8 from "../../assets/Image8.png";
import Image9 from "../../assets/Image9.png";
import Image10 from "../../assets/Image10.png";
import Image11 from "../../assets/Image11.png";

const images = [
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
  Image8,
  Image9,
  Image10,
  Image11,
];

const ImageSlider = () => {
  const squares = [
    {
      image: images[2],
      size: "w-80 h-56",
      position: { top: "2%", left: "5%" },
    },
    {
      image: images[0],
      size: "w-36 h-28",
      position: { top: "45%", left: "6%" },
    },
    {
      image: images[3],
      size: "w-56 h-36",
      position: { top: "68%", left: "5%" },
    },
    {
      image: images[9],
      size: "w-32 h-36",
      position: { top: "5%", left: "30%" },
    },
    {
      image: images[4],
      size: "w-48 h-32",
      position: { top: "34%", left: "30%" },
    },
    {
      image: images[8],
      size: "w-72 h-48",
      position: { bottom: "5%", left: "%" },
    },
    {
      image: images[1],
      size: "w-64 h-48",
      position: { top: "10%", left: "50%" },
    },
    {
      image: images[5],
      size: "w-56 h-36",
      position: { top: "60%", left: "55%" },
    },
    {
      image: images[7],
      size: "w-64 h-40",
      position: { top: "8%", right: "-2%" },
    },
    {
      image: images[6],
      size: "w-36 h-28",
      position: { top: "40%", right: "5%" },
    },
    {
      image: images[10],
      size: "w-56 h-40",
      position: { top: "65%", right: "-1%" },
    },
  ];

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      {squares.map((square, index) => (
        <div
          key={index}
          className={`mx-2 bg-cover bg-center ${square.size} absolute`}
          style={{
            ...square.position,
            backgroundImage: `url(${square.image})`,
            animation: "moveLeft 100s linear infinite",
          }}
        ></div>
      ))}
      <style>
        {`
              @keyframes moveLeft {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(calc(-100% + 10vw)); // Adjust the distance as needed
                }
              }
            `}
      </style>
    </div>
  );
};

export default ImageSlider;
