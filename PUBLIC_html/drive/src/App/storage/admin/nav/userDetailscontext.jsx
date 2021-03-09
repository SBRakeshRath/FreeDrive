import { createContext, useState } from "react";
export const userDatacontext = createContext();
export const UserDatacontextProvider = ({ children }) => {
    const [userData, setUserData] = useState({firstName : "A"});
  return <userDatacontext.Provider value={{ userData, setUserData }}>
      {children}
  </userDatacontext.Provider>;
};



