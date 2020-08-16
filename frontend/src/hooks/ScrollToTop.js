import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCurrentWidth } from "./useCurrentWidth";
export default function ScrollToTop(props) {
  const { pathname } = useLocation();
  let width = useCurrentWidth();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (width <= 576) {
      console.log("entra");
      props.closeMenu();
    }
  }, [pathname]);

  return null;
}
