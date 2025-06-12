import { Station } from '@/models/Station';
import { Tanking, TankingModel } from '@/models/Tanking';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Database } from './database';

export type modelTypes = {
  tankings: (Tanking & { station: Station })[];
  isLoading: boolean;
  initAll: () => Promise<void>;
  initTankings: () => Promise<void>;
};

export const DatabaseContext = createContext<modelTypes | undefined>(undefined);

export const DatabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [tankings, setTankings] = useState<(Tanking & { station: Station })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const initTankings = async () => {
    setIsLoading(true);
    const db = await Database.getConnection();
    if (db) {
      try {
        const data = await TankingModel.getAllTankingsWithStationFuel();
        setTankings(data);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error('Database not ready!');
    }
    setIsLoading(false);
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
    <DatabaseContext.Provider value={{ tankings, initTankings, initAll, isLoading }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const ctx = useContext(DatabaseContext);
  if (!ctx) throw new Error('Data must be called inside <DatabaseProvider>');
  return ctx;
};
