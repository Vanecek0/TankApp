import { Station } from '@/models/Station';
import { Tanking, TankingModel } from '@/models/Tanking';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Database } from './database';
import { Fuel } from '@/models/Fuel';
import { StationFuel } from '@/models/StationFuel';

export type modelTypes = {
  tankings: {month: string, tankings: (Tanking & { station: Station, fuel: Fuel, station_fuel: StationFuel })[]}[];
  tankingSumsByDate: ({ month: string; total_price: number; total_mileage: number })[]
  tankingSums: { total_price: number; total_mileage: number } | undefined
  isLoading: boolean;
  initAll: () => Promise<void>;
  initTankings: () => Promise<void>;
};

export const DatabaseContext = createContext<modelTypes | undefined>(undefined);

export const DatabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [tankings, setTankings] = useState<{month: string, tankings: (Tanking & { station: Station, fuel: Fuel, station_fuel: StationFuel })[]}[]>([]);
  const [tankingSums, setTankingSums] = useState<({ total_price: number; total_mileage: number })>();
  const [tankingSumsByDate, setTankingSumsByDate] = useState<({ month: string; total_price: number; total_mileage: number })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const initTankings = async () => {
    setIsLoading(true);
    const db = await Database.getConnection();
    if (db) {
      try {
        const data = await TankingModel.getGroupedTankingsByMonth();
        const dataSums = await TankingModel.getTotalPriceAndMileage();
        const dataSumsByDate = await TankingModel.getPriceMileageSumByDate();
        setTankings(data);
        setTankingSums(dataSums);
        setTankingSumsByDate(dataSumsByDate);
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
    <DatabaseContext.Provider value={{ tankings, tankingSumsByDate, tankingSums, initTankings, initAll, isLoading }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const ctx = useContext(DatabaseContext);
  if (!ctx) throw new Error('Data must be called inside <DatabaseProvider>');
  return ctx;
};
