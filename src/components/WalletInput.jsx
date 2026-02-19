import React, { useState } from 'react';
import { isValidEVMAddress } from '../utils/validators';
import { Search } from 'lucide-react';

const WalletInput = ({ onFetch, loading }) => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!address.trim()) {
      setError('Enter wallet address');
      return;
    }

    if (!isValidEVMAddress(address)) {
      setError('Invalid address');
      return;
    }

    setError('');
    onFetch(address);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setAddress(text);
      setError('');
    } catch (err) {
      console.error('Paste failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Wallet Address
        </label>
        <div className="relative">
          <input
            type="text"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              if (error) setError('');
            }}
            placeholder="0x..."
            className={`w-full h-10 pl-9 pr-16 text-sm rounded-lg border ${
              error ? 'border-red-300' : 'border-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent`}
            disabled={loading}
          />
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          
          <button
            type="button"
            onClick={handlePaste}
            className="absolute right-2 top-2 px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 active:bg-gray-200"
          >
            Paste
          </button>
        </div>
        {error && (
          <p className="text-xs text-red-600 mt-1">{error}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full h-10 rounded-lg text-sm font-medium ${
          loading
            ? 'bg-gray-100 text-gray-400'
            : 'bg-[#3B82F6] text-white active:bg-[#2563eb]'
        }`}
      >
        {loading ? 'Loading...' : 'View Portfolio'}
      </button>
    </form>
  );
};

export default WalletInput;