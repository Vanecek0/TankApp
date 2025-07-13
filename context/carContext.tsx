import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Car, CarModel } from '@/models/Car';

// --- Kontext typy ---
type CarContextType = {
    car: Car | null;
    setCar: (car: Car | null) => void;
};

const CarContext = createContext<CarContextType | undefined>(undefined);

// --- Vlastní hook ---
export const useCar = (): CarContextType => {
    const ctx = useContext(CarContext);
    if (!ctx) {
        throw new Error('useCar must be used within a CarProvider');
    }
    return ctx;
};

async function getCarById(id: number): Promise<Car | null> {
    const car = await CarModel.findById(id);
    if (car) {
        return car;
    }
    return null;
}

async function getFirstAvailableCar(): Promise<Car | null> {
    const car = await CarModel.first();
    if (car) {
        return car;
    }
    return null;
}

// --- Provider komponenta ---
export const CarProvider = ({ children }: { children: React.ReactNode }) => {
    const [car, setCarState] = useState<Car | null>(null);

    const setCar = async (car: Car | null) => {
        if (car?.id !== undefined) {
            await AsyncStorage.setItem('selected_car_id', String(car.id));
        } else {
            await AsyncStorage.removeItem('selected_car_id');
        }
        setCarState(car);
    };

    useEffect(() => {
        (async () => {
            const idStr = await AsyncStorage.getItem('selected_car_id');
            let car: Car | null = null;

            if (idStr) {
                const id = parseInt(idStr, 10);
                car = await getCarById(id);
            } else {
                car = await getFirstAvailableCar();
                if(car) {
                    await AsyncStorage.setItem('selected_car_id', String(car.id));
                }
            }

            setCarState(car);
        })();
    }, []);

    return (
        <CarContext.Provider value={{ car, setCar }}>
            {children}
        </CarContext.Provider>
    );
};
