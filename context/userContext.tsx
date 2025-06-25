import { Profile } from '@/models/Profile';
import React, { createContext, useContext, useReducer } from 'react';

type UserContextType = {
    user: Profile;
    dispatch: React.Dispatch<
        | { type: 'SET_USER'; payload: Profile }
        | { type: 'CLEAR_USER' }
    >;
};

const initialState: Profile = {
    id: undefined,
    name: '',
    avatar_url: '',
    created_at: 0,
    updated_at: 0,
};

function userReducer(
    state: Profile,
    action: { type: 'SET_USER'; payload: Profile } | { type: 'CLEAR_USER' }
): Profile {
    switch (action.type) {
        case 'SET_USER':
            return { ...action.payload };
        case 'CLEAR_USER':
            return { ...initialState };
        default:
            return state;
    }
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value= {{ user, dispatch }
}>
    { children }
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}