import React, { createContext, useContext, useState, ReactNode } from "react";

type UserType = "Admin" | "Customer" | "Employee";

interface UserTypeContextProps {
    userType: UserType | null;
    setUserType: React.Dispatch<React.SetStateAction<UserType | null>>;
}

const UserTypeContext = createContext<UserTypeContextProps | undefined>(
    undefined
);

export const UserTypeProvider: React.FC<{ children: ReactNode }> = ({  children, }) => {
    const [userType, setUserType] = useState<UserType | null>(null);
    return (
        <UserTypeContext.Provider value={{ userType, setUserType }}>
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
