import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('http://localhost:5500/refresh', {
            withCredentials: true
        });
        setAuth(prev => ({
            ...prev, accessToken: response.data.accessToken
        }));
        return response.data.accessToken; 
    }
    return refresh;
};

export default useRefreshToken;