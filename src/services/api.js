import axios from 'axios';

const ALCHEMY_API_KEY = 'Z8lPVzjQobtfL74QLgdF6';

// Chain configurations with your Alchemy RPC URLs
const chains = {
  ethereum: { 
    name: 'Ethereum', 
    nativeToken: 'ETH', 
    rpcUrl: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    chainId: '0x1'
  },
  polygon: { 
    name: 'Polygon', 
    nativeToken: 'MATIC', 
    rpcUrl: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    chainId: '0x89'
  },
  arbitrum: { 
    name: 'Arbitrum', 
    nativeToken: 'ETH', 
    rpcUrl: `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    chainId: '0xA4B1'
  },
  base: { 
    name: 'Base', 
    nativeToken: 'ETH', 
    rpcUrl: `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    chainId: '0x2105'
  }
};

// BSC using public RPC
const bscChain = {
  name: 'BSC',
  nativeToken: 'BNB',
  rpcUrl: 'https://bsc-dataseed.binance.org/'
};

// CoinGecko API for prices
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Generic function to make Alchemy RPC calls
const makeAlchemyRequest = async (rpcUrl, method, params = []) => {
  try {
    const response = await axios.post(rpcUrl, {
      jsonrpc: '2.0',
      id: 1,
      method: method,
      params: params
    });

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    return response.data.result;
  } catch (error) {
    console.error(`Alchemy RPC error (${method}):`, error);
    throw error;
  }
};

// Fetch native balance
const fetchNativeBalance = async (address, chain) => {
  try {
    const result = await makeAlchemyRequest(
      chain.rpcUrl,
      'eth_getBalance',
      [address, 'latest']
    );
    
    // Convert from wei to ether
    const balanceInEth = parseInt(result, 16) / 1e18;
    return balanceInEth;
  } catch (error) {
    console.error(`Error fetching balance for ${chain.name}:`, error);
    return 0;
  }
};

// Fetch BSC balance
const fetchBSCBalance = async (address) => {
  try {
    const response = await axios.post(bscChain.rpcUrl, {
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_getBalance',
      params: [address, 'latest']
    });

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    const balanceInWei = response.data.result;
    const balanceInBnb = parseInt(balanceInWei, 16) / 1e18;
    return balanceInBnb;
  } catch (error) {
    console.error('Error fetching BSC balance:', error);
    return 0;
  }
};

// Fetch token balances using Alchemy's token API (custom method)
const fetchTokenBalances = async (address, chain) => {
  try {
    // Get token balances
    const result = await makeAlchemyRequest(
      chain.rpcUrl,
      'alchemy_getTokenBalances',
      [address]
    );

    const tokenBalances = result?.tokenBalances || [];
    
    // Filter out zero balances
    const nonZeroTokens = tokenBalances.filter(token => {
      const balance = parseInt(token.tokenBalance || '0', 16);
      return balance > 0;
    });

    // Get metadata for each token
    const tokens = await Promise.all(
      nonZeroTokens.map(async (token) => {
        try {
          // Get token metadata
          const metadata = await makeAlchemyRequest(
            chain.rpcUrl,
            'alchemy_getTokenMetadata',
            [token.contractAddress]
          );

          const decimals = metadata.decimals || 18;
          const balance = parseInt(token.tokenBalance, 16) / Math.pow(10, decimals);
          
          // Get token price from CoinGecko
          const price = await fetchTokenPrice(metadata.symbol);
          
          return {
            contractAddress: token.contractAddress,
            name: metadata.name || 'Unknown Token',
            symbol: metadata.symbol || '???',
            balance: balance.toFixed(4),
            decimals: decimals,
            usdPrice: price,
            usdValue: price ? balance * price : null
          };
        } catch (error) {
          console.error('Error fetching token metadata:', error);
          return null;
        }
      })
    );

    return tokens.filter(token => token !== null);
  } catch (error) {
    console.error(`Error fetching tokens for ${chain.name}:`, error);
    return [];
  }
};

// Fetch NFTs using Alchemy's NFT API
const fetchNFTs = async (address, chain) => {
  try {
    const result = await makeAlchemyRequest(
      chain.rpcUrl,
      'alchemy_getNFTs',
      [address]
    );

    const ownedNFTs = result?.ownedNfts || [];
    
    return ownedNFTs.slice(0, 10).map(nft => ({
      name: nft.title || nft.metadata?.name || 'Unnamed NFT',
      collectionName: nft.contract?.name || 'Unknown Collection',
      image: nft.metadata?.image || nft.metadata?.image_url || 
             nft.metadata?.image_data || nft.media?.[0]?.gateway || 
             'https://via.placeholder.com/150?text=NFT',
      tokenId: nft.id?.tokenId || '0',
      contractAddress: nft.contract?.address
    }));
  } catch (error) {
    console.error(`Error fetching NFTs for ${chain.name}:`, error);
    return [];
  }
};

// Fetch token prices from CoinGecko
const fetchTokenPrice = async (symbol) => {
  if (!symbol) return null;
  
  const tokenIdMap = {
    'ETH': 'ethereum',
    'WETH': 'ethereum',
    'USDC': 'usd-coin',
    'USDT': 'tether',
    'DAI': 'dai',
    'WBTC': 'wrapped-bitcoin',
    'MATIC': 'matic-network',
    'BNB': 'binancecoin',
    'UNI': 'uniswap',
    'AAVE': 'aave',
    'LINK': 'chainlink',
    'CRV': 'curve-dao-token',
    'SNX': 'havven',
    'MKR': 'maker',
    'COMP': 'compound-governance-token',
    'YFI': 'yearn-finance',
    'SUSHI': 'sushi',
    'APE': 'apecoin',
    'SAND': 'the-sandbox',
    'MANA': 'decentraland'
  };

  const coinId = tokenIdMap[symbol.toUpperCase()];
  if (!coinId) return null;

  try {
    const response = await axios.get(
      `${COINGECKO_API}/simple/price?ids=${coinId}&vs_currencies=usd`
    );
    return response.data[coinId]?.usd || null;
  } catch (error) {
    console.error('Error fetching price:', error);
    return null;
  }
};

// Fetch native token price
const fetchNativePrice = async (nativeToken) => {
  const tokenMap = {
    'ETH': 'ethereum',
    'MATIC': 'matic-network',
    'BNB': 'binancecoin'
  };

  const coinId = tokenMap[nativeToken];
  if (!coinId) return 0;

  try {
    const response = await axios.get(
      `${COINGECKO_API}/simple/price?ids=${coinId}&vs_currencies=usd`
    );
    return response.data[coinId]?.usd || 0;
  } catch (error) {
    console.error('Error fetching native price:', error);
    return 0;
  }
};

// Main function to fetch all wallet data
export const fetchWalletData = async (address) => {
  const results = {};

  // Fetch data for Alchemy-supported chains
  for (const [chainKey, chain] of Object.entries(chains)) {
    try {
      console.log(`Fetching ${chain.name} data...`);
      
      // Fetch native balance
      const nativeBalance = await fetchNativeBalance(address, chain);
      
      // Fetch native token price
      const nativePrice = await fetchNativePrice(chain.nativeToken);
      const nativeUsdValue = nativeBalance * nativePrice;

      // Fetch token balances
      const tokens = await fetchTokenBalances(address, chain);
      
      // Fetch NFTs
      const nfts = await fetchNFTs(address, chain);

      // Calculate total token value
      const tokenUsdValue = tokens.reduce((sum, token) => sum + (token.usdValue || 0), 0);

      results[chainKey] = {
        chain: chainKey,
        nativeBalance: nativeBalance.toFixed(4),
        nativeToken: chain.nativeToken,
        nativeUsdValue,
        tokens,
        nfts,
        totalValue: nativeUsdValue + tokenUsdValue
      };

      console.log(`${chain.name} data fetched successfully`);
    } catch (error) {
      console.error(`Error fetching ${chain.name} data:`, error);
      results[chainKey] = {
        chain: chainKey,
        nativeBalance: '0',
        nativeToken: chain.nativeToken,
        tokens: [],
        nfts: [],
        totalValue: 0,
        error: error.message
      };
    }
  }

  // Fetch BSC data
  try {
    console.log('Fetching BSC data...');
    const bscBalance = await fetchBSCBalance(address);
    const bnbPrice = await fetchNativePrice('BNB');
    const bnbUsdValue = bscBalance * bnbPrice;

    results['bsc'] = {
      chain: 'bsc',
      nativeBalance: bscBalance.toFixed(4),
      nativeToken: 'BNB',
      nativeUsdValue: bnbUsdValue,
      tokens: [],
      nfts: [],
      totalValue: bnbUsdValue
    };
  } catch (error) {
    console.error('Error fetching BSC data:', error);
    results['bsc'] = {
      chain: 'bsc',
      nativeBalance: '0',
      nativeToken: 'BNB',
      tokens: [],
      nfts: [],
      totalValue: 0,
      error: error.message
    };
  }

  return results;
};