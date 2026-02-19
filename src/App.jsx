import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import WalletInput from './components/WalletInput';
import Portfolio from './components/Portfolio';
import Documentation from './pages/Documentation';
import ApiStatus from './pages/ApiStatus';
import SupportedChains from './pages/SupportedChains';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { useWalletData } from './hooks/useWalletData';
import { Home, FileText, Activity, Globe, Shield, Menu, X, Layers } from 'lucide-react';

function AppContent() {
  const [walletAddress, setWalletAddress] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { data, loading, error, fetchWalletData } = useWalletData();

  useEffect(() => {
    document.documentElement.className = 'light';
  }, []);

  const handleFetch = (address) => {
    setWalletAddress(address);
    fetchWalletData(address);
    setMenuOpen(false);
  };

  const totalValue = data ? 
    Object.values(data).reduce((sum, chain) => sum + (chain.totalValue || 0), 0) : 0;

  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { path: '/documentation', label: 'Docs', icon: <FileText className="w-5 h-5" /> },
    { path: '/api-status', label: 'Status', icon: <Activity className="w-5 h-5" /> },
    { path: '/supported-chains', label: 'Chains', icon: <Globe className="w-5 h-5" /> },
    { path: '/privacy', label: 'Privacy', icon: <Shield className="w-5 h-5" /> },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header - Fixed height */}
      <header className="bg-white border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between px-4 h-14">
          <Link to="/" className="flex items-center space-x-2" onClick={() => setMenuOpen(false)}>
            <div className="w-8 h-8 bg-[#3B82F6] rounded-lg flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-base text-gray-900">ChainScope</span>
          </Link>
          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center active:bg-gray-100"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-14 left-0 right-0 bg-white border-b border-gray-100 shadow-lg z-50">
            <nav className="px-4 py-2">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 h-12 rounded-lg mb-1 ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-[#3B82F6]'
                      : 'text-gray-600 active:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content - Scrollable */}
      <main className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-md mx-auto"> {/* Centers content on larger phones */}
          <Routes>
            <Route path="/" element={
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Portfolio Tracker</h1>
                  <p className="text-xs text-gray-500">5 chains supported</p>
                </div>

                {/* Wallet Input */}
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                  <WalletInput onFetch={handleFetch} loading={loading} />
                </div>

                {/* Quick Stats */}
                {data && !loading && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-xl border border-gray-100 p-3">
                      <p className="text-xs text-gray-500 mb-1">Total Value</p>
                      <p className="text-lg font-bold text-gray-900">
                        ${totalValue.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 p-3">
                      <p className="text-xs text-gray-500 mb-1">Active Chains</p>
                      <p className="text-lg font-bold text-gray-900">
                        {Object.keys(data).length}/5
                      </p>
                    </div>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                    <p className="text-xs text-red-600">{error}</p>
                  </div>
                )}

                {/* Loading */}
                {loading && (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-[#3B82F6]"></div>
                  </div>
                )}

                {/* Portfolio */}
                {data && !loading && (
                  <Portfolio data={data} walletAddress={walletAddress} />
                )}
              </div>
            } />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/api-status" element={<ApiStatus />} />
            <Route path="/supported-chains" element={<SupportedChains />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </div>
      </main>

      {/* Bottom Navigation - Fixed height */}
      <nav className="bg-white border-t border-gray-100 flex-shrink-0">
        <div className="flex h-16">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={`flex-1 flex flex-col items-center justify-center space-y-1 ${
                location.pathname === item.path
                  ? 'text-[#3B82F6]'
                  : 'text-gray-400'
              }`}
            >
              {item.icon}
              <span className="text-[10px]">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;