import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component ensures that every route transition
 * resets the scroll position to the top of the page immediately,
 * preventing any jarring jump or offset scroll retention.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
