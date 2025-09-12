import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Car } from '@/models/Car';
import { carRepository } from '@/repositories/carRepository';

type CarContextType = {
    car: Car | null;
    setCar: (car: Car | null) => Promise<void>;
};

const CarContext = createContext<CarContextType | undefined>(undefined);

export const useCar = (): CarContextType => {
    const context = useContext(CarContext);
    if (!context) {
        throw new Error('useCar must be used within a CarProvider');
    }
    return context;
};

const getCarById = async (id: number): Promise<Car | null> => {
    return await carRepository.getById(id);
};

const getFirstAvailableCar = async (): Promise<Car | null> => {
    return await carRepository.getFirst();
};

type CarProviderProps = { children: ReactNode };

export const CarProvider = ({ children }: CarProviderProps) => {
    const [car, setCarState] = useState<Car | null>(null);

    const setCar = async (newCar: Car | null) => {
        if (newCar?.id !== undefined) {
            await AsyncStorage.setItem('selected_car_id', String(newCar.id));
        } else {
            await AsyncStorage.removeItem('selected_car_id');
        }
        setCarState(newCar);
    };

    useEffect(() => {
        const initCar = async () => {
            const idStr = await AsyncStorage.getItem('selected_car_id');
            let loadedCar: Car | null = null;

            if (idStr) {
                const id = parseInt(idStr, 10);
                loadedCar = await getCarById(id);
            } else {
                loadedCar = await getFirstAvailableCar();
                if (loadedCar) {
                    await AsyncStorage.setItem('selected_car_id', String(loadedCar.id));
                }
            }

            setCarState(loadedCar);
        };

        initCar();
    }, []);

    return (
        <CarContext.Provider value={{ car, setCar }}>
            {children}
        </CarContext.Provider>
    );
};