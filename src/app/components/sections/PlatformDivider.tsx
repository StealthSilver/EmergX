const STROKE_COLOR = "#A1A7B2";
const CAP_COLOR = "#580b97";

export default function PlatformDivider() {
  return (
    <div className="w-full" aria-hidden>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="8"
        viewBox="0 0 1401 8"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M4.10547 3.73438H1400.3"
          stroke={STROKE_COLOR}
          strokeWidth="2"
          strokeDasharray="2 10"
        />
        <rect
          x="0.722656"
          y="0.335938"
          width="6.79492"
          height="6.79492"
          fill={CAP_COLOR}
        />
        <rect
          x="1393.51"
          y="0.335938"
          width="6.79492"
          height="6.79492"
          fill={CAP_COLOR}
        />
      </svg>
    </div>
  );
}
