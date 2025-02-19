import AssetItem from "./AssetItem";

interface AssetItemProps {
    _id: string;
    name: string;
    image: string;
    currentMarketValue: number;
    quantity: number;
    pnl: number;
}

interface ActiveAssetListProps {
    portfolio: AssetItemProps[];
}

export default function ActiveAssetList({ portfolio }: ActiveAssetListProps) {
    return (
        <div className="flex flex-col w-full p-10 pt-0 rounded-t-lg">
                <h1 className="text-gray-500 text-3xl font-semibold mb-4">Assets</h1>
                <div className="grid grid-cols-5 text-gray-500 bg-gray-900 py-2 text-xl rounded-t-lg">
                    <p className="pl-4">Name</p>
                    <p className="pl-4">Balance</p>
                    <p className="pl-4">Quantity</p>
                    <p className="pl-4">Profit/Loss</p>
                </div>
                {portfolio.map((item) => (
                    <AssetItem key={item._id} item={item} />
                ))}
        </div>
    );
}
