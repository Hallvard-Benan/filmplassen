const ImageSlider = () => {
    const squares = [
      { color: 'bg-red-500', size: 'w-64 h-48', position: { top: '10vh', left: '10vw' } },
      { color: 'bg-blue-500', size: 'w-36 h-28', position: { top: '40vh', left: '6vw' } },
      { color: 'bg-green-500', size: 'w-56 h-36', position: { top: '59vh', left: '9vw' } },
      { color: 'bg-yellow-500', size: 'w-32 h-36', position: { top: '18vh', left: '36vw' } },
      { color: 'bg-purple-500', size: 'w-48 h-32', position: { top: '40vh', left: '30vw' } },
      { color: 'bg-orange-500', size: 'w-64 h-36', position: { top: '60vh', left: '32vw' } },
      { color: 'bg-pink-500', size: 'w-64 h-48', position: { top: '25vh', left: '50vw' } },
      { color: 'bg-indigo-500', size: 'w-56 h-36', position: { top: '55vh', left: '55vw' } },
      { color: 'bg-teal-500', size: 'w-64 h-40', position: { top: '10vh', left: '70vw' } },
      { color: 'bg-cyan-500', size: 'w-36 h-28', position: { top: '35vh', left: '75vw' } },
      { color: 'bg-gray-500', size: 'w-56 h-40', position: { top: '60vh', left: '75vw' } },
    ];
  
    return (
        <div className="absolute top-0 left-0 w-full h-full">
          {squares.map((square, index) => (
            <div
              key={index}
              className={`m-2 ${square.color} ${square.size} absolute`}
              style={{
                ...square.position,
                animation: 'moveLeft 100s linear infinite', // Apply moveLeft to all squares
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