import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Portfolio = ({ data, walletAddress }) => {
  const [expandedChain, setExpandedChain] = useState(null);

  const toggleChain = (chain) => {
    setExpandedChain(expandedChain === chain ? null : chain);
  };

  const formatAddress = (addr) => {
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  const chainIcons = {
    ethereum: '⟠',
    bsc: '⚡',
    polygon: '⧫',
    arbitrum: '🔷',
    base: '🔵'
  };

  const chainNames = {
    ethereum: 'Ethereum',
    bsc: 'BSC',
    polygon: 'Polygon',
    arbitrum: 'Arbitrum',
    base: 'Base'
  };

  return (
    <div className="space-y-3">
      {/* Wallet Badge */}
      <div className="bg-white rounded-xl border border-gray-100 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-[#3B82F6]">ID</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Wallet</p>
              <p className="text-sm font-medium text-gray-900">{formatAddress(walletAddress)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chains */}
      {Object.entries(data).map(([chain, chainData]) => (
        <div key={chain} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {/* Chain Header */}
          <button
            onClick={() => toggleChain(chain)}
            className="w-full px-4 py-3 flex items-center justify-between active:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-sm">{chainIcons[chain]}</span>
              </div>
              <div className="text-left">
                <h3 className="text-sm font-semibold text-gray-900">
                  {chainNames[chain]}
                </h3>
                <p className="text-xs text-gray-500">
                  {Number(chainData.nativeBalance).toFixed(4)} {chainData.nativeToken}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900">
                ${chainData.totalValue?.toFixed(2) || '0'}
              </span>
              {expandedChain === chain ? 
                <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                <ChevronDown className="w-4 h-4 text-gray-400" />
              }
            </div>
          </button>

          {/* Expanded Content */}
          {expandedChain === chain && (
            <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
              {/* Native Balance Detail */}
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Native Balance</p>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-900">
                    {Number(chainData.nativeBalance).toFixed(4)} {chainData.nativeToken}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    ${chainData.nativeUsdValue?.toFixed(2) || '0'}
                  </span>
                </div>
              </div>

              {/* Tokens */}
              {chainData.tokens?.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-2">Tokens</p>
                  <div className="space-y-2">
                    {chainData.tokens.slice(0, 3).map((token, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 bg-[#3B82F6] rounded-full flex items-center justify-center text-white text-[8px] font-bold">
                            {token.symbol?.slice(0, 2)}
                          </div>
                          <span className="text-xs text-gray-600">{token.symbol}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-900 block">
                            {Number(token.balance).toFixed(2)}
                          </span>
                          {token.usdValue && (
                            <span className="text-xs text-gray-500">
                              ${token.usdValue.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Portfolio;