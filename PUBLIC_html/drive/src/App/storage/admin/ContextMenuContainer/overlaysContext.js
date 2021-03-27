import { createContext, useState } from "react";
export const OverlayContext = createContext();
export const OverlayContextProvider = ({ children }) => {
  const [overlays, SetOverlays] = useState({ visibility: "hidden" });
  return (
    <OverlayContext.Provider value={{ overlays, SetOverlays }}>
      {children}
    </OverlayContext.Provider>
  );
};
