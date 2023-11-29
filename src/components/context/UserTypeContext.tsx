import React, {createContext, useContext, useState, ReactNode, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {timeToJwtExpire} from "../jwt/TimeToJwtExpire";
import refreshJwtToken from "../jwt/RefreshJwtToken";

type UserType = "ADMIN" | "CUSTOMER" | "EMPLOYEE";
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
    const navigate = useNavigate()

    useEffect(() => {
        const checkJwtToken = async() => {
            const token = sessionStorage.getItem("jwt")
            const token2 = sessionStorage.getItem("tempId")
            if (token && !token2){
                const timeLeft = timeToJwtExpire(token)
                if (timeLeft <= 90){
                    try {
                        const {jwt: newJwt, refreshToken: newRefresh} = await refreshJwtToken()
                        sessionStorage.setItem("jwt", newJwt)
                        sessionStorage.setItem("refresh_token", newRefresh)
                        setLoggedIn(true)
                    } catch (error){
                        console.log("Couldn't refresh token", error)
                        sessionStorage.removeItem("jwt");
                        sessionStorage.removeItem("refresh_token");
                        navigate("/")
                    }
                } else {
                   setLoggedIn(true)
                }
            }
        }

        checkJwtToken()

        const intervalJwtCheck = setInterval(checkJwtToken,  60*1000)
        return () => clearInterval(intervalJwtCheck)

    }, []);


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
