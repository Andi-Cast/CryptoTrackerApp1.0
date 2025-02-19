import React from 'react';
import usePortfolioFetcher from '../hooks/usePortfolioFetcher';
import ActiveAssetList from './ActiveAssetList';

export default function DashBoard() {
    const { data, error } = usePortfolioFetcher();

    if (error) return <div>Error loading portfolio: {error}</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div className='flex-col flex bg-gray-950 w-full h-full items-center justify-center text-gray-700'>
            <div className='flex flex-col w-full p-10'>
                <h1 className="text-gray-500 text-3xl font-semibold mb-4">Portfolio Overview</h1>
                <div className="flex w-full gap-2 justify-between">
                    <div className="flex flex-col w-1/3 bg-gray-800 rounded-xl p-5 border border-gray-500">
                        <p className="text-gray-500 text-xl mb-2">Total Worth</p>
                        <p className="text-white text-3xl">${data.portfolioMarketValue.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col w-1/3 bg-gray-800 rounded-xl p-5 border border-gray-500">
                        <p className="text-gray-500 text-xl mb-2">Total Cost</p>
                        <p className="text-white text-3xl">${data.portfolioCostBasis.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col w-1/3 bg-gray-800 rounded-xl p-5 border border-gray-500">
                        <p className="text-gray-500 text-xl mb-2">Unrealized Return</p>
                        <p className="text-white text-3xl">${(data.portfolioMarketValue - data.portfolioCostBasis).toFixed(2)}</p>
                    </div>
                </div>
            </div>
            <ActiveAssetList portfolio={data.portfolio}/>
        </div>
    );
};