import React from 'react';

const NFTList = ({ nfts }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {nfts.map((nft, index) => (
        <div
          key={`${nft.tokenAddress}-${nft.tokenId}-${index}`}
          className="rounded-lg overflow-hidden border border-gray-100 bg-white hover:shadow-md transition-shadow"
        >
          {nft.image ? (
            <img
              src={nft.image}
              alt={nft.name || 'NFT'}
              className="w-full h-32 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150?text=NFT';
              }}
            />
          ) : (
            <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
              <span className="text-sm text-gray-400">No image</span>
            </div>
          )}
          
          <div className="p-3">
            <p className="text-sm font-medium text-gray-900 truncate">{nft.name || 'Unnamed NFT'}</p>
            {nft.collectionName && (
              <p className="text-xs text-gray-500 truncate">{nft.collectionName}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NFTList;