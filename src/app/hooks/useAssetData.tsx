import { useState, useEffect, useCallback } from "react";
import { AxiosError } from "axios";
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

    const fetchData = useCallback(async () => {
        if (!auth.userId || !auth.accessToken || typeof assetId !== 'string') {
            setError('Authentication details not provided or asset ID is invalid.');
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const response = await axiosPrivate.get(`/user/${auth.userId}/get-asset/${assetId}`);
            setAssetData(response.data);
            setError(null);
        } catch (error) {
            const axiosError = error as AxiosError;
            setError(axiosError.message || 'Failed to fetch asset data.');
        } finally {
            setLoading(false);
        }
    }, [auth.userId, auth.accessToken, assetId, axiosPrivate]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { assetData, loading, error, refresh: fetchData };
};

export default useAssetData;
