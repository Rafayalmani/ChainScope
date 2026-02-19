import { useState, useCallback, useEffect, useRef } from 'react';
import { fetchWalletData } from '../services/api';

export const useWalletData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const abortControllerRef = useRef(null);
  const refreshIntervalRef = useRef(null);

  const fetchData = useCallback(async (address) => {
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchWalletData(address);
      setData(result);
      setLastUpdated(Date.now());
      
      // Auto-refresh every 30 seconds
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
      
      refreshIntervalRef.current = setInterval(() => {
        fetchData(address);
      }, 30000); // 30 seconds
      
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Failed to fetch wallet data');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
    lastUpdated,
    fetchWalletData: fetchData
  };
};