import { useEffect, useState } from "react";
import useAssetData from "../hooks/useAssetData";
import axios, { axiosPrivate } from "../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import TransactionForm from "./TransactionForm";
import useAuth from "../hooks/useAuth";


export default function MyAssetPage() {
    const { assetData, loading, error, refresh } = useAssetData();
    const { auth } = useAuth();
    const [currentPrice, setCurrentPrice] = useState(null);
    const [priceError, setPriceError] = useState('');

    const [showAddNewTransaction, setShowAddNewTransaction] = useState(false);

    const fetchPrice = async () => {
        try {
            const response = await axios.get(`http://localhost:5500/currentData/price/${assetData?.name}`);
            setCurrentPrice(response.data.price);
        } catch (error) {
            console.log("Error fetching price:", error);
            setPriceError('Failed to fetch current price.');
        }
    };

    useEffect(() => {
        if (assetData?.name) {
            fetchPrice();
        }
    }, [assetData]);

    const handleSaveTrade = async ( tradeData: { name: string; amount: number; price: number; timestamp: string; type: string; } ) => {
        try {
            const response = await axios.post(`http://localhost:5500/user/trade/${auth.userId}`, tradeData, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`
                }
            });
            await refresh();
            setShowAddNewTransaction(false);
        } catch (error) {
            console.error("Error saving trade: ", error)
        }
    }

    const handleDeleteTrade = async (tradeId: String) => {
        try {
            await axiosPrivate.delete(`http://localhost:5500/user/${auth.userId}/delete-trade/${assetData?._id}/${tradeId}`,{
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`
                }
            });
            await refresh();
        } catch (error) {
            console.error("Error deleting trade: ", error);
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex flex-col w-full h-full bg-gray-950 justify-center items-center">
            {assetData ? (
                <>
                    <h1 className="flex w-full text-white justify-between items-center gap-2 p-10">
                        <div className="flex items-center gap-4">
                            <img className="w-12" src={assetData.image} alt={`Image of ${assetData.name}`} />
                            <p className="text-[28px] font-bold">{assetData.name}</p>
                        </div>
                        <p className="flex items-center text-[32px] font-mono pl-5">${currentPrice}</p>
                    </h1>
                    <div className="flex flex-col w-full justify-center items-center gap-2">
                        <div className="flex flex-col w-full justify-start p-10 pt-0">
                            <h1 className="text-gray-500 text-3xl font-semibold mb-4">Your holdings</h1>
                            <div className="flex w-full gap-2">
                                <div className="flex flex-col w-1/4 bg-gray-800 rounded-xl p-5 border border-gray-500">
                                    <p className="text-gray-500 text-xl mb-2">Total Amount</p>
                                    <p className="text-white text-3xl">{assetData.quantity?.toPrecision(4)}</p>
                                </div>
                                <div className="flex flex-col w-1/4 bg-gray-800 rounded-xl p-5 border border-gray-500">
                                    <p className="text-gray-500 text-xl mb-2">Total Worth</p>
                                    <p className="text-white text-3xl">${assetData.currentMarketValue?.toFixed(2)}</p>
                                </div>
                                <div className="flex flex-col w-1/4 bg-gray-800 rounded-xl p-5 border border-gray-500">
                                    <p className="text-gray-500 text-xl mb-2">Unrealized Return</p>
                                    <p className="text-white text-3xl">${assetData.pnl?.toFixed(2)}</p>
                                </div>
                                <div className="flex flex-col w-1/4 bg-gray-800 rounded-xl p-5 border border-gray-500">
                                    <p className="text-gray-500 text-xl mb-2">Total Cost</p>
                                    <p className="text-white text-3xl">${assetData.costBasis?.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {priceError && <p className="text-red-500">{priceError}</p>}
                </>
            ) : <p>No asset data available.</p>}

            <div className="flex flex-col w-full p-10 pt-0 rounded-t-lg">
                <div className="flex w-full justify-between mb-2">
                    <h1 className="text-gray-500 text-3xl font-semibold mb-4">Transactions</h1>
                    <button onClick={() => setShowAddNewTransaction(true)} className="bg-gray-700 text-white px-4 py-2 rounded-xl font-semibold cursor-pointer hover:bg-gray-500">Add New Transaction</button>
                    {assetData && (
                        <Modal show={showAddNewTransaction} onClose={() => setShowAddNewTransaction(false)}>
                            <TransactionForm assetName={assetData.name} onSave={handleSaveTrade}></TransactionForm>
                        </Modal>
                    )}
                </div>
                <div className="grid grid-cols-5 text-gray-500 bg-gray-900 py-2 text-xl rounded-t-lg">
                    <p className="pl-4">Trade Type</p>
                    <p className="pl-4">Amount</p>
                    <p className="pl-4">Price</p>
                    <p className="pl-4">Date</p>
                </div>

                {assetData?.trades.map((trade, index) => (
                    <div 
                        key={trade._id}
                        className={`grid grid-cols-5 bg-gray-700 text-white text-2xl py-2 ${
                            index === assetData.trades.length - 1 ? "rounded-b-lg" : ""
                        }`}
                    > 
                        <p className="pl-4">{trade.type.toUpperCase()}</p>
                        <p className="pl-4">{trade.amount}</p>
                        <p className="pl-4">${trade.total.toFixed(2)}</p>
                        <p className="pl-4">{new Date(trade.timestamp).toLocaleDateString()}</p>
                        <p className="flex w -full justify-end pr-5 gap-6">
                            <FontAwesomeIcon className="cursor-pointer hover:text-blue-600" icon={faPenToSquare}/>
                            <FontAwesomeIcon onClick={() => handleDeleteTrade(trade._id)} className="cursor-pointer hover:text-red-600" icon={faSquareXmark}/>
                        </p>
                    </div>
                ))}
            </div>

            
        </div>
    );
}
