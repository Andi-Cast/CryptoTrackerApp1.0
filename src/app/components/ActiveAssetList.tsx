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
        <div className="flex flex-col w-1/2">
            <div className="p-2 bg-gray-100 font-bold border border-gray-400">Active Assets</div>
            <div className='grid grid-cols-4 gap-2 border border-t-0 text-gray-400 border-gray-400 p-2 bg-gray-100'>
                <p className='flex items-center'>Name</p>
                <p className='flex items-center justify-end'>Balance</p>
                <p className='flex items-center justify-end'>Quantity</p>
                <p className='flex items-center justify-end'>Profit/Loss</p>
            </div>
            {portfolio.map((item) => (
                <AssetItem key={item._id} item={item} />
            ))}
        </div>
    );
}
