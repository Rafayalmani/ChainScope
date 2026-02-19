import React from 'react';
import { Book, Code } from 'lucide-react';

const Documentation = () => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-[#3B82F6] rounded-lg flex items-center justify-center">
          <Book className="w-4 h-4 text-white" />
        </div>
        <h1 className="text-lg font-bold text-gray-900">Documentation</h1>
      </div>

      {/* Quick Start */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <h2 className="text-sm font-semibold text-gray-900 mb-2">Quick Start</h2>
        <p className="text-xs text-gray-500 mb-3">
          Install the SDK to get started
        </p>
        
        <div className="bg-gray-900 rounded-lg p-3">
          <code className="text-xs text-gray-300 block">
            npm install @chainscope/sdk
          </code>
        </div>
      </div>

      {/* Example */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <h2 className="text-sm font-semibold text-gray-900 mb-2">Basic Usage</h2>
        <div className="bg-gray-50 rounded-lg p-3">
          <pre className="text-xs text-gray-700">
            <code>{`import { ChainScope } from '@chainscope/sdk';

const client = new ChainScope({
  apiKey: 'your-key'
});

const portfolio = await client
  .getPortfolio('0x...');`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Documentation;