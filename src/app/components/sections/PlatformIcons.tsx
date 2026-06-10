type PlatformIconProps = {
  name: "sourcing" | "evaluation" | "verification" | "integrations";
};

const ICON_COLOR = "#ffffff";

export default function PlatformIcon({ name }: PlatformIconProps) {
  switch (name) {
    case "sourcing":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
          <circle
            cx="10"
            cy="10"
            r="5.5"
            stroke={ICON_COLOR}
            strokeWidth="1.5"
          />
          <path
            d="M14.5 14.5L19 19"
            stroke={ICON_COLOR}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="10" cy="10" r="2" fill={ICON_COLOR} />
        </svg>
      );
    case "evaluation":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
          <rect
            x="5"
            y="4"
            width="14"
            height="16"
            rx="1.5"
            stroke={ICON_COLOR}
            strokeWidth="1.5"
          />
          <path
            d="M8.5 9H15.5M8.5 12H13M8.5 15H11"
            stroke={ICON_COLOR}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M16 16L17.5 17.5L20.5 14"
            stroke={ICON_COLOR}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "verification":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
          <path
            d="M12 3.5L18.5 6.5V11.5C18.5 15.8 15.8 18.8 12 20C8.2 18.8 5.5 15.8 5.5 11.5V6.5L12 3.5Z"
            stroke={ICON_COLOR}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 12L11 13.5L14.5 10"
            stroke={ICON_COLOR}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "integrations":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
          <rect
            x="3"
            y="3"
            width="7"
            height="7"
            rx="1"
            stroke={ICON_COLOR}
            strokeWidth="1.5"
          />
          <rect
            x="14"
            y="3"
            width="7"
            height="7"
            rx="1"
            stroke={ICON_COLOR}
            strokeWidth="1.5"
          />
          <rect
            x="3"
            y="14"
            width="7"
            height="7"
            rx="1"
            stroke={ICON_COLOR}
            strokeWidth="1.5"
          />
          <rect
            x="14"
            y="14"
            width="7"
            height="7"
            rx="1"
            stroke={ICON_COLOR}
            strokeWidth="1.5"
          />
          <path
            d="M10 6.5H14M10 17.5H14M6.5 10V14M17.5 10V14"
            stroke={ICON_COLOR}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}
