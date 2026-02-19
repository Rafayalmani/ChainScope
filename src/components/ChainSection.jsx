import React from 'react';
import TokenList from './TokenList';
import NFTList from './NFTList';

const ChainSection = ({ data }) => {
  const chainNames = {
    ethereum: { name: 'Ethereum', icon: '⟠' },
    bsc: { name: 'BNB Smart Chain', icon: '⚡' },
    polygon: { name: 'Polygon', icon: '⧫' },
    arbitrum: { name: 'Arbitrum', icon: '🔷' },
    base: { name: 'Base', icon: '🔵' }
  };

  const chainInfo = chainNames[data.chain] || { name: data.chain, icon: '⛓️' };

  return (
    <div className="px-6 py-4 border-t border-gray-100">
      {/* Native Balance */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Native Balance</h4>
        <div className="p-4 rounded-lg bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">{chainInfo.icon}</span>
              <span className="font-medium text-gray-900">
                {data.nativeBalance} {data.nativeToken}
              </span>
            </div>
            {data.nativeUsdValue > 0 && (
              <span className="text-sm font-medium text-gray-900">
                ${data.nativeUsdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tokens */}
      {data.tokens && data.tokens.length > 0 ? (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Tokens ({data.tokens.length})</h4>
          <TokenList tokens={data.tokens} />
        </div>
      ) : (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Tokens</h4>
          <p className="text-sm text-gray-400 italic">No tokens found</p>
        </div>
      )}

      {/* NFTs */}
      {data.nfts && data.nfts.length > 0 ? (
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">NFTs ({data.nfts.length})</h4>
          <NFTList nfts={data.nfts} />
        </div>
      ) : (
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">NFTs</h4>
          <p className="text-sm text-gray-400 italic">No NFTs found</p>
        </div>
      )}
    </div>
  );
};

export default ChainSection;