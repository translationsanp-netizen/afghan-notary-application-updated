import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { translateCurrentPage } from "@/lib/aiTranslate";

const RouteTranslationSync = () => {
  const location = useLocation();

  useEffect(() => {
    const id = window.setTimeout(() => translateCurrentPage(), 80);
    return () => window.clearTimeout(id);
  }, [location.pathname, location.search]);

  return null;
};

export default RouteTranslationSync;