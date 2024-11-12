import React, { createContext, useContext, useState } from 'react';

const DrawerContext = createContext();

export const useDrawerContext = () => useContext(DrawerContext);

export const DrawerProvider = ({ children }) => {
  const [isSwipeEnabled, setSwipeEnabled] = useState(true);

  return (
    <DrawerContext.Provider value={{ isSwipeEnabled, setSwipeEnabled }}>
      {children}
    </DrawerContext.Provider>
  );
};