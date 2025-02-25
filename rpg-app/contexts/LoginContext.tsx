import React, { createContext, useState } from 'react';

interface LoginContextProps {
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginContext = createContext<LoginContextProps | undefined>(undefined);


export const useLogin = () => {
    const context = React.useContext(LoginContext);
    if (!context) {
        throw new Error('useLogin must be used within a LoginProvider');
    }
    return context;
}


interface LoginProviderProps {
    children: React.ReactNode;
}

const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    return (
        <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider;