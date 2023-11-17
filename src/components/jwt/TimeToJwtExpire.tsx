import {jwtDecode} from "jwt-decode";

interface TokenInfo {
    exp: number;
    iat: number;
}

export function timeToJwtExpire(token: string) : number{
        try {
             const decoded: TokenInfo = jwtDecode(token)
             const currentTime = Date.now() / 1000; // /1000 - tid till sekunder
             return decoded.exp - currentTime // tid kvar i seknder
        } catch (error){
            console.log("Can't decode token :( :::" + error)
            return -1
        }
}