import { Station } from '@/models/Station';
import { Tanking, TankingModel } from '@/models/Tanking';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type modelTypes = {
  tankings: (Tanking & { station: Station })[];
  isLoading: boolean;
  initTankings: () => Promise<void>;
};

export const DatabaseContext = createContext<modelTypes | undefined>(undefined);

export const DatabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [tankings, setTankings] = useState<(Tanking & { station: Station })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const initTankings = async () => {
    try {
      const data = await TankingModel.getAllTankingsWithStation();
      setTankings(data);
    } catch (err) {
      console.error(err);
    }
  };

const initAll = async () => {
  setIsLoading(true);
  try {
    await initTankings();
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  initAll();
}, []);

return (
  <DatabaseContext.Provider value={{ tankings, initTankings, isLoading }}>
    {children}
  </DatabaseContext.Provider>
);
};

export const useDatabase = () => {
  const ctx = useContext(DatabaseContext);
  if (!ctx) throw new Error('Data must be called inside <DatabaseProvider>');
  return ctx;
};
