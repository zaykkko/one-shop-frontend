import {createContext, useContext, useState, useCallback} from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn(isLogged: boolean): void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuthContext must be used within a AuthContext");
    }

    return context;
}

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [isLoggedIn, setLoggedState] = useState(
        !!localStorage.getItem(process.env.LOGIN_STORAGE_KEY as string)
    );

    const setIsLoggedIn = useCallback(
        (isLogged: boolean) => {
            if (isLogged) {
                localStorage.setItem(
                    process.env.LOGIN_STORAGE_KEY as string,
                    "true"
                );
            } else {
                localStorage.removeItem(
                    process.env.LOGIN_STORAGE_KEY as string
                );
            }

            setLoggedState(isLogged);
        },
        [isLoggedIn]
    );

    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
};
