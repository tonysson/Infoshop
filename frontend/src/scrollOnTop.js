
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


/**
 * @description Allow us to scroll on top any time we go to some page
 */
const ScrollOnTop = () => {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
    });
  }, [pathname]);
  return null;
};

export default ScrollOnTop;
