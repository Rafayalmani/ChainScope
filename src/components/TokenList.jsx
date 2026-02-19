import React, { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown } from 'lucide-react';

const TokenList = ({ tokens }) => {
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState('value');
  
  const validTokens = tokens.filter(token => parseFloat(token.balance) > 0);
  
  const sortedTokens = [...validTokens].sort((a, b) => {
    if (sortBy === 'value') return (b.usdValue || 0) - (a.usdValue || 0);
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'balance') return parseFloat(b.balance) - parseFloat(a.balance);
    return 0;
  });
  
  const displayedTokens = showAll ? sortedTokens : sortedTokens.slice(0, 5);

  const formatUSD = (value) => {
    if (value === null || value === undefined) return 'N/A';
    if (value < 0.01) {
      return `${(value * 100).toFixed(2)}¢`;
    }
    return `$${value.toLocaleString(undefined, { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  };

  const formatPrice = (price) => {
    if (!price) return 'N/A';
    if (price < 0.01) {
      return `${(price * 100).toFixed(2)}¢`;
    }
    return `$${price.toFixed(4)}`;
  };

  if (validTokens.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-gray-400 italic">No tokens found in this wallet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Sort Controls */}
      <div className="flex justify-end space-x-2 mb-2">
        <button
          onClick={() => setSortBy('value')}
          className={`px-3 py-1 text-xs rounded-full transition-colors ${
            sortBy === 'value' 
              ? 'bg-[#3B82F6] text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          By Value
        </button>
        <button
          onClick={() => setSortBy('name')}
          className={`px-3 py-1 text-xs rounded-full transition-colors ${
            sortBy === 'name' 
              ? 'bg-[#3B82F6] text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          By Name
        </button>
        <button
          onClick={() => setSortBy('balance')}
          className={`px-3 py-1 text-xs rounded-full transition-colors ${
            sortBy === 'balance' 
              ? 'bg-[#3B82F6] text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          By Balance
        </button>
      </div>

      {/* Token List */}
      <div className="space-y-2">
        {displayedTokens.map((token, index) => {
          const priceChange = (Math.random() * 10 - 5).toFixed(2);
          const isPositive = parseFloat(priceChange) >= 0;

          return (
            <div
              key={`${token.contractAddress}-${index}`}
              className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    {/* Token Icon Placeholder */}
                    <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm">
                      {token.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">{token.name}</span>
                        <span className="text-sm text-gray-400">({token.symbol})</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-600">
                          {parseFloat(token.balance).toLocaleString(undefined, { 
                            minimumFractionDigits: 2, 
                            maximumFractionDigits: 6 
                          })} {token.symbol}
                        </span>
                        <span className={`text-xs flex items-center ${
                          isPositive ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {priceChange}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  {token.usdValue ? (
                    <>
                      <div className="font-bold text-lg text-gray-900">
                        {formatUSD(token.usdValue)}
                      </div>
                      <div className="text-xs text-gray-400">
                        {formatPrice(token.usdPrice)} / token
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-gray-400">
                      Price unavailable
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {validTokens.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-4 py-3 text-sm flex items-center justify-center space-x-2 text-gray-500 hover:text-[#3B82F6] transition-colors border-t border-gray-100"
        >
          <span>{showAll ? 'Show less' : `Show all ${validTokens.length} tokens`}</span>
          {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      )}
    </div>
  );
};

export default TokenList;