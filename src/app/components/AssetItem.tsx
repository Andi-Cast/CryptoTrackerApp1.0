import Link from "next/link";

interface AssetItemProps {
    item: {
        _id: string;
        name: string;
        image: string;
        currentMarketValue: number;
        quantity: number;
        pnl: number;
    };
}

export default function({ item }: AssetItemProps) {
    return (
        <Link href={`/assets/${item._id}`}>
            <div className='grid grid-cols-4 gap-2 border border-t-0 border-gray-400 p-2 bg-gray-100 cursor-pointer hover:bg-gray-300'>
                <div className='flex items-center space-x-3'>
                    <img src={item.image} alt={item.name} style={{ width: 35, height: 35 }} />
                    <h2 className='flex justify-start items-center font-semibold'>{item.name}</h2>
                </div>
                <p className='flex items-center justify-end'>$ {item.currentMarketValue.toFixed(2)}</p>
                <p className='flex items-center justify-end'>{item.quantity}</p>
                <p className='flex items-center justify-end'>$ {item.pnl.toFixed(2)}</p>
            </div>
        </Link>
    );
};
