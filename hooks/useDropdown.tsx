import React, { createContext, useContext, useState } from "react";

type DropdownContextType = {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
};

const DropdownContext = createContext<DropdownContextType>({
  activeId: null,
  setActiveId: () => {},
});

export const DropdownProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <DropdownContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => useContext(DropdownContext);