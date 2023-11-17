import axios from "axios";

const refreshJwtToken = async ():Promise<{jwt: string, refreshToken: string}> => {
    const backendUrl = "http://localhost:8080/"
    const refreshToken = sessionStorage.getItem("refresh_token")
    const jwt = sessionStorage.getItem("jwt");
    if (!jwt) {
        throw new Error("JWT not found in sessionStorage");
    }
    if (!refreshToken) {
        throw new Error("finns inget refresh token :")
    }

    try {
        const resp = await axios.get(`${backendUrl}api/auth/refresh`,  {
            headers: {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${jwt}`,
                "refresh_token": refreshToken
            }
        })

        const newJwt = resp.data.access_token
        const newRefresh = resp.data.refresh_token
        if (!newJwt || !newRefresh){
            throw new Error("one or more tokens didn't come back")
        }

        return {jwt: newJwt, refreshToken: newRefresh}
    } catch (error){
        console.log("error refreshing JWT", error)
        throw new Error("Couldn't refresh JWT")
    }
}
export default refreshJwtToken