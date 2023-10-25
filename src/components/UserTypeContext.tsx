import React, { createContext, useContext, useState, ReactNode } from "react";

type UserType = "Admin" | "Customer" | "Employee";
type id = string | null

interface UserTypeContextProps {
    userType: UserType | null;
    setUserType: React.Dispatch<React.SetStateAction<UserType | null>>;
    id: id;
    setId: React.Dispatch<React.SetStateAction<id | null>>;
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}


export const UserTypeContext = createContext<UserTypeContextProps | undefined>(
    undefined
);

export const UserTypeProvider: React.FC<{ children: ReactNode }> = ({  children}) => {
    const [userType, setUserType] = useState<UserType | null>(null);
    const [id, setId] = useState<id | null>(null);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    return (
        <UserTypeContext.Provider value={{ userType, setUserType, id, setId, loggedIn, setLoggedIn}}>
            {children}
        </UserTypeContext.Provider>
    );
};

export const useUserType = (): UserTypeContextProps => {
    const context = useContext(UserTypeContext);
    if (!context) {
        throw new Error("error determining user type");
    }
    return context;
};
