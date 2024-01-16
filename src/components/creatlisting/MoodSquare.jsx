export default function MoodSquare() {
    return (
      <div className="w-48 h-28 border border-black relative">
        <svg
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          width="40"
          height="20"
          viewBox="0 0 40 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="2" y1="10" x2="38" y2="10" stroke="black" strokeWidth="2" />
          <line x1="20" y1="2" x2="20" y2="18" stroke="black" strokeWidth="2" />
        </svg>
      </div>
    );
  }
  