import React from 'react';
import { Globe, CheckCircle, XCircle, ExternalLink, Activity, DollarSign, Image, Zap } from 'lucide-react';

const SupportedChains = () => {
  const chains = [
    {
      name: 'Ethereum',
      chainId: '1',
      nativeToken: 'ETH',
      icon: '⟠',
      status: 'active',
      features: ['Native Balance', 'Token Balances', 'NFTs', 'Transaction History'],
      endpoints: ['eth-mainnet.g.alchemy.com'],
      avgBlockTime: '12s',
      tvl: '$45.2B',
      color: '#627EEA'
    },
    {
      name: 'BNB Smart Chain',
      chainId: '56',
      nativeToken: 'BNB',
      icon: '⚡',
      status: 'active',
      features: ['Native Balance', 'Token Balances', 'Transaction History'],
      endpoints: ['bsc-dataseed.binance.org'],
      avgBlockTime: '3s',
      tvl: '$5.8B',
      color: '#F3BA2F'
    },
    {
      name: 'Polygon',
      chainId: '137',
      nativeToken: 'MATIC',
      icon: '⧫',
      status: 'active',
      features: ['Native Balance', 'Token Balances', 'NFTs', 'Transaction History'],
      endpoints: ['polygon-mainnet.g.alchemy.com'],
      avgBlockTime: '2.1s',
      tvl: '$1.2B',
      color: '#8247E5'
    },
    {
      name: 'Arbitrum One',
      chainId: '42161',
      nativeToken: 'ETH',
      icon: '🔷',
      status: 'active',
      features: ['Native Balance', 'Token Balances', 'NFTs', 'Transaction History'],
      endpoints: ['arb-mainnet.g.alchemy.com'],
      avgBlockTime: '0.25s',
      tvl: '$2.4B',
      color: '#28A0F0'
    },
    {
      name: 'Base',
      chainId: '8453',
      nativeToken: 'ETH',
      icon: '🔵',
      status: 'active',
      features: ['Native Balance', 'Token Balances', 'NFTs', 'Transaction History'],
      endpoints: ['base-mainnet.g.alchemy.com'],
      avgBlockTime: '2s',
      tvl: '$0.8B',
      color: '#0052FF'
    },
    {
      name: 'Optimism',
      chainId: '10',
      nativeToken: 'ETH',
      icon: '✨',
      status: 'coming-soon',
      features: ['Native Balance', 'Token Balances', 'NFTs'],
      endpoints: ['optimism-mainnet.g.alchemy.com'],
      avgBlockTime: '2s',
      tvl: '$0.9B',
      color: '#FF0420'
    },
    {
      name: 'Avalanche',
      chainId: '43114',
      nativeToken: 'AVAX',
      icon: '❄️',
      status: 'coming-soon',
      features: ['Native Balance', 'Token Balances'],
      endpoints: ['avalanche-mainnet.infura.io'],
      avgBlockTime: '1s',
      tvl: '$0.7B',
      color: '#E84142'
    }
  ];

  const getStatusBadge = (status) => {
    if (status === 'active') {
      return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">Active</span>;
    }
    return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">Coming Soon</span>;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-[#3B82F6] rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Supported Chains</h1>
        </div>
        <p className="text-gray-500 text-lg">
          Track your assets across multiple EVM-compatible blockchains
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <p className="text-sm text-gray-500 mb-1">Active Chains</p>
          <p className="text-3xl font-bold text-gray-900">5</p>
          <p className="text-xs text-gray-500 mt-2">+2 coming soon</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <p className="text-sm text-gray-500 mb-1">Total Value Locked</p>
          <p className="text-3xl font-bold text-gray-900">$55.4B</p>
          <p className="text-xs text-gray-500 mt-2">Across all chains</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <p className="text-sm text-gray-500 mb-1">Avg Block Time</p>
          <p className="text-3xl font-bold text-gray-900">2.1s</p>
          <p className="text-xs text-gray-500 mt-2">Network average</p>
        </div>
      </div>

      {/* Chains Grid */}
      <div className="grid grid-cols-1 gap-4">
        {chains.map((chain, index) => (
          <div key={index} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: chain.color }}
                >
                  <span className="text-lg">{chain.icon}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-semibold text-gray-900">{chain.name}</h2>
                    {getStatusBadge(chain.status)}
                  </div>
                  <p className="text-sm text-gray-500">Chain ID: {chain.chainId} • Native: {chain.nativeToken}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Block Time: {chain.avgBlockTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">TVL: {chain.tvl}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{chain.endpoints[0]}</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Supported Features:</p>
              <div className="flex flex-wrap gap-2">
                {chain.features.map((feature, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {chain.status === 'coming-soon' && (
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <p className="text-xs text-yellow-700">
                  🚧 This chain is currently in development. Full support coming soon.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* RPC Endpoints */}
      <div className="mt-8 bg-white border border-gray-100 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">RPC Endpoints</h2>
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-1">Ethereum</p>
            <code className="text-xs text-[#3B82F6]">https://eth-mainnet.g.alchemy.com/v2/YOUR-API-KEY</code>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-1">Polygon</p>
            <code className="text-xs text-[#3B82F6]">https://polygon-mainnet.g.alchemy.com/v2/YOUR-API-KEY</code>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-1">Arbitrum</p>
            <code className="text-xs text-[#3B82F6]">https://arb-mainnet.g.alchemy.com/v2/YOUR-API-KEY</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportedChains;