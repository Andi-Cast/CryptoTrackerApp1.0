"use client"
import { useRouter } from "next/router";
import { createContext, useState, FC, ReactNode, Dispatch, SetStateAction } from "react";
import axios from "axios";
const SIGNOUT_URL = 'http://localhost:5500/logout'

type AuthData = {
    roles?: string[];
    accessToken?: string;
    userId?: string
    [key: string]: any;  
};

interface AuthContextType {
    auth: AuthData;
    setAuth: Dispatch<SetStateAction<AuthData>>;
    logout: () => void;
}

const defaultAuthState: AuthContextType = {
    auth: {},   // Initially empty object
    setAuth: () => {},
    logout: () => {}  // No-op function
};

const AuthContext = createContext<AuthContextType>(defaultAuthState);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState<AuthData>({});
    const router = useRouter();

    const logout = async () => {
        try {
            const response = await axios.get(SIGNOUT_URL, { withCredentials: true });
            if (response.status === 204) {
                setAuth({});
                router.push('/auth/signin');
            }
            if (response.status === 401) {
                setAuth({});
                router.push('/auth/signin');
            }
            
        } catch (error) {
            console.error('Logout failed: ',error );
        }
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
