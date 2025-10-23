import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import "./BookFab.css";

import ClosedBook from "../assets/icons/Closed_Book_Static.png";
import BookOpenAnim from "../assets/animations/BookOpen.json";
// Optional – not required for this flow, but preloaded to avoid network stall later.
import BookCloseAnim from "../assets/animations/BookClose.json";

type Props = {
  to?: string;                   // route to open
  title?: string;                // aria label / tooltip
  size?: number;                 // circle size in px
  offset?: { right?: number; bottom?: number };
};

export default function BookFab({
  to = "/tasks",
  title = "Open Tasks",
  size = 48,                     // small button
  offset = { right: 24, bottom: 24 },
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide the FAB while we’re on the target route
  const onTasksRoute = location.pathname.startsWith(to);

  const [animating, setAnimating] = useState(false);

  // Lottie options (open animation plays once)
  const lottieOptions = useMemo(
    () => ({
      loop: false,
      autoplay: true,
      animationData: BookOpenAnim,
      rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
    }),
    []
  );

  // Preload images/close anim so switching is instant later if you need it
  useEffect(() => {
    [ClosedBook].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    // touch the close animation so it’s cached; not displayed in this flow
    void BookCloseAnim;
  }, []);

  const handleClick = () => {
    // Play open animation once, then navigate
    setAnimating(true);
  };

  // When the animation completes, route to /tasks
  const eventListeners =
    animating
      ? [{ eventName: "complete", callback: () => {
            setAnimating(false);
            navigate(to);
        }}]
      : [];

  if (onTasksRoute) return null;

  return (
    <button
      className="book-fab"
      title={title}
      aria-label={title}
      onClick={handleClick}
      style={{ width: size, height: size, right: offset.right, bottom: offset.bottom }}
    >
      {animating ? (
        <Lottie
          options={lottieOptions}
          height={Math.round(size * 0.7)}
          width={Math.round(size * 0.7)}
          isStopped={false}
          isPaused={false}
          eventListeners={eventListeners as any}
        />
      ) : (
        <img
          src={ClosedBook}
          alt=""               /* decorative; button has aria-label */
          className="book-fab__img"
          draggable={false}
        />
      )}
    </button>
  );
}
