import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { AxiosError } from "axios";
import useAuth from "./useAuth";

interface PortfolioItem {
    _id: string;
    user: string;
    name: string;
    image: string;
    quantity: number;
    costBasis: number;
    currentMarketValue: number;
    pnl: number;
}

interface PortfolioResponse {
    portfolio: PortfolioItem[];
    portfolioMarketValue: number;
    portfolioCostBasis: number;
}

const usePortfolioFetcher = () => {
    const { auth } = useAuth();
    const [data, setData] = useState<PortfolioResponse | null>(null);
    const [error, setError] = useState<String | null>(null);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get(`http://localhost:5500/user/portfolio/${auth.userId}`, {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`
                    }
                });
                setData(response.data);
                setError(null);
            } catch (error) {
                const axiosError = error as AxiosError;
                setError(axiosError.message);
                setData(null);
            }
        }

        fetchData();

        const intervalId = setInterval(fetchData, 60000);
        
        return () => clearInterval(intervalId);
    }, []);

    return { data, error }
};

export default usePortfolioFetcher;