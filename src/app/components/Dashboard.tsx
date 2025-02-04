import React from 'react';
import usePortfolioFetcher from '../hooks/usePortfolioFetcher';
import ActiveAssetList from './ActiveAssetList';

export default function DashBoard() {
    const { data, error } = usePortfolioFetcher();

    if (error) return <div>Error loading portfolio: {error}</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div className='flex-col flex bg-white w-full h-full items-center text-gray-700'>
            <h1>Portfolio Overview</h1>
            <p>Total Market Value: ${data.portfolioMarketValue.toFixed(2)}</p>
            <p>Total Cost Basis: ${data.portfolioCostBasis.toFixed(2)}</p>
            <ActiveAssetList portfolio={data.portfolio}/>
        </div>
    );
};