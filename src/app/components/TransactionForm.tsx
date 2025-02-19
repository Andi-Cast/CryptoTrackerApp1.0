import { ChangeEvent, FormEvent, useState } from "react";

interface TransactionFormProps {
    assetName: string;
    onSave: (
        trade: {
            name: string; 
            amount: number;
            price: number;
            timestamp: string;
            type: string;
        }
    ) => void;
}

const TradeForm: React.FC<TransactionFormProps> = ({ assetName, onSave }) => {
    const [name] = useState(assetName);
    const [formData, setFormData] = useState({
        amount: '', 
        price: '',
        type: 'buy'
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const timestamp = new Date().toISOString();
        onSave({
            name,
            amount: Number(formData.amount),
            price: Number(formData.price),
            timestamp,
            type: formData.type
        });
        setFormData({
            amount: "", 
            price: "",  
            type: 'buy' 
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2 bg-gray-950 p-5">
            <h2 className="text-white text-2xl font-semibold mb-4">
                {`New Transaction for ${assetName}`}
            </h2>
            <label className="text-white font-semibold">Amount:</label>
            <input 
                type="number" 
                name="amount"
                value={formData.amount} 
                onChange={handleInputChange} 
                className="text-white mb-4 p-2 border-1 rounded-md bg-gray-600 w-full"
                required 
            />
            <label className="text-white font-semibold">Unit Price:</label>
            <input 
                type="number" 
                name="price"
                value={formData.price} 
                onChange={handleInputChange} 
                className="text-white mb-4 p-2 border-1 rounded-md bg-gray-600 w-full" 
                required 
            />
            <label className="text-white font-semibold">Type:</label>
            <select 
                name="type"
                value={formData.type} 
                onChange={handleSelectChange} 
                className="text-white mb-4 p-2 border-1 rounded-md bg-gray-600 w-full"
            >
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
            </select>
            <button type="submit" className="flex justify-center items-center text-white bg-blue-500 rounded-xl p-4 font-bold hover:bg-blue-600 w-full mt-4">
                Submit Trade
            </button>
        </form>
    );
};

export default TradeForm;
