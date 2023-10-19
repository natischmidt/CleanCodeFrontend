import React, { createContext, useContext, useState, ReactNode } from "react";

type UserType = "Admin" | "Customer" | "Employee";
type id = string | null
// type loggedIn = boolean

interface UserTypeContextProps {
    userType: UserType | null;
    setUserType: React.Dispatch<React.SetStateAction<UserType | null>>;
    id: id | null;
    setId: React.Dispatch<React.SetStateAction<id | null>>;
    // loggedIn: loggedIn;
}



const UserTypeContext = createContext<UserTypeContextProps | undefined>(
    undefined
);

export const UserTypeProvider: React.FC<{ children: ReactNode }> = ({  children}) => {
    const [userType, setUserType] = useState<UserType | null>(null);
    const [id, setId] = useState<id | null>(null);
    return (
        <UserTypeContext.Provider value={{ userType, setUserType, id, setId }}>
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
