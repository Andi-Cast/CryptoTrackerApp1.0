import useAssetData from "../hooks/useAssetData";

export default function MyAssetPage() {
    const { assetData, loading, error } = useAssetData();

    if (loading) return <p>Loading...</p>;
    if(error) return <p>Error: {error}</p>;

    return (
        <div className="flex flex-col w-full h-full bg-black justify-center items-center">
            {assetData && (
                <>
                    <h1 className="flex text-white justify-center items-center gap-2">
                        <img 
                            className="w-12"
                            src={assetData.image} alt={assetData.name} 
                        />
                        <p className="text-[20px]">{assetData.name}</p>
                    </h1>
                    <div className="flex flex-col w-full justify-center items-center gap-2">
                        <div className="flex flex-col w-full justify-start p-10 bg-green-50">
                            <h1 className="text-gray-500 text-3xl font-semibold">Your holdings</h1>
                            <div className="flex w-full gap-2 bg-green-400">
                                <div className="flex flex-col w-1/4 bg-gray-800 rounded-xl p-5 border border-gray-500">
                                    <p className="text-gray-500 text-xl mb-2">Amount</p>
                                    <p className="text-white text-3xl">{assetData.quantity.toPrecision(4)}</p>
                                </div>
                                <div className="flex flex-col w-1/4 bg-gray-800 rounded-xl p-5 border border-gray-500">
                                    <p className="text-gray-500 text-xl mb-2">Market Value</p>
                                    <p className="text-white text-3xl">${assetData.currentMarketValue.toFixed(2)}</p>
                                </div>
                                <div className="flex flex-col w-1/4 bg-gray-800 rounded-xl p-5 border border-gray-500">
                                    <p className="text-gray-500 text-xl mb-2">Unrealized Return</p>
                                    <p className="text-white text-3xl">${assetData.pnl.toFixed(2)}</p>
                                </div>
                                <div className="flex flex-col w-1/4 bg-gray-800 rounded-xl p-5 border border-gray-500">
                                    <p className="text-gray-500 text-xl mb-2">Total Cost</p>
                                    <p className="text-white text-3xl">${assetData.costBasis.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Further details and mapping over trades if necessary */}
                </>
            )}
        </div>
    );
};