import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Database } from './database';
import { SQLiteDatabase } from 'expo-sqlite';

type DatabaseContextType = {
    db: SQLiteDatabase;
};

export const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);


export const DatabaseProvider = ({ children }: { children: ReactNode }) => {
    const [db, setDb] = useState<SQLiteDatabase>();

    useEffect(() => {
        async function initDb() {
            try {
                setDb(await Database.getConnection());
            } catch (error) {
                console.error("Database initialization error:", error);
            }
        }
        initDb();
    }, []);

    if (!db) return null;


    return (
        <DatabaseContext.Provider value={{ db }}>
            {children}
        </DatabaseContext.Provider>
    );
};

export const useDatabase = () => {
    const ctx = useContext(DatabaseContext);
    if (!ctx) throw new Error('Data must be called inside <DatabaseProvider>');
    return ctx;
};