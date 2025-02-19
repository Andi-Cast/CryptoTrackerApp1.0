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

            <div 
                key={item._id}
                className="grid grid-cols-5 bg-gray-700 text-white text-2xl py-2 cursor-pointer hover:bg-gray-500"
            > 
                <div className='flex items-center space-x-3 pl-4'>
                    <img src={item.image} alt={item.name} style={{ width: 35, height: 35 }} />
                    <h2 className='flex justify-start items-center'>{item.name}</h2>
                </div>
                <p className="pl-4">$ {item.currentMarketValue.toFixed(2)}</p>
                <p className="pl-4">{item.quantity.toFixed(4)}</p>
                <p className="pl-4">$ {item.pnl.toFixed(2)}</p>
            </div>
        </Link>
    );
};
