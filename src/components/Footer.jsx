import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <div className="bg-white border-t border-gray-100 mt-4">
      <div className="px-4 py-3">
        {/* Simple Links */}
        <div className="flex justify-center space-x-4 mb-2">
          <a href="/documentation" className="text-xs text-gray-400 active:text-[#3B82F6]">Docs</a>
          <a href="/api-status" className="text-xs text-gray-400 active:text-[#3B82F6]">Status</a>
          <a href="/supported-chains" className="text-xs text-gray-400 active:text-[#3B82F6]">Chains</a>
          <a href="/privacy" className="text-xs text-gray-400 active:text-[#3B82F6]">Privacy</a>
        </div>

        {/* Copyright */}
        <p className="text-[10px] text-gray-300 text-center">
          © 2024 ChainScope · v1.0
        </p>
        
        {/* Made with love */}
        <p className="text-[10px] text-gray-300 text-center mt-1 flex items-center justify-center">
          <span>Made with</span>
          <Heart className="w-3 h-3 text-red-400 fill-current mx-1" />
          <span>by ChainScope</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;