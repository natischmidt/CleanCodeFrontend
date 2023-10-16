import React, { createContext, useContext, useState, ReactNode } from "react";

type UserId = string;

interface UserContextProps {
    userId: UserId | null;
    setUserId: React.Dispatch<React.SetStateAction<UserId | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(
    undefined
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({  children, }) => {
    const [userId, setUserId] = useState<UserId | null>(null);
    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserType = (): UserContextProps => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("error determining user type");
    }
    return context;
};
