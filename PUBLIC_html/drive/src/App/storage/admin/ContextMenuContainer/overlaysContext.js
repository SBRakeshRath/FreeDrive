import { createContext, useState } from "react";
export const OverlayContext = createContext();
export const SetOverlayContext = createContext();
export const OverlayContextProvider = ({ children }) => {
  const [overlays, SetOverlays] = useState({ visibility: "hidden" });
  return (
    <SetOverlayContext.Provider value={{ SetOverlays }}>
      <OverlayContext.Provider value={{ overlays }}>
        {children}
      </OverlayContext.Provider>
    </SetOverlayContext.Provider>
  );
};
