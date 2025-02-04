import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import useAxiosPrivate from "./useAxiosPrivate";
import { useRouter } from "next/router";
import useAuth from "./useAuth";

interface Trade {
    amount: number;
    price: number;
    total: number;
    timestamp: string;
    type: string;
    _id: string;
}

interface Asset {
    _id: string;
    user: string;
    name: string;
    image: string;
    quantity: number;
    costBasis: number;
    averagePrice: number;
    currentMarketValue: number;
    pnl: number;
    trades: Trade[];
    __v: number;
}

const useAssetData = () => {
    const [assetData, setAssetData] = useState<Asset | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { id: assetId } = router.query;
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        if (!auth.userId || !auth.accessToken || typeof assetId !== 'string') {
            setError('Authentication details not provided or asset ID is invalid.');
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get(`http://localhost:5500/user/${auth.userId}/get-asset/${assetId}`, {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`
                    }
                });
                setAssetData(response.data);
                setError(null);
            } catch (error) {
                const axiosError = error as AxiosError;
                setError(axiosError.message || 'Failed to fetch asset data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [auth.userId, auth.accessToken, assetId]);

    return { assetData, loading, error };
};

export default useAssetData;
