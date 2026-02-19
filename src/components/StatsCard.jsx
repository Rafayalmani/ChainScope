import React from 'react';

const StatsCard = ({ title, value, icon, trend, subtitle }) => {
  return (
    <div className="p-6 rounded-xl border border-gray-100 bg-white hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">{title}</span>
        <div>{icon}</div>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      {trend && (
        <div className="flex items-center space-x-2">
          <span className={`text-xs ${
            trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
          }`}>{trend}</span>
          {subtitle && <span className="text-xs text-gray-400">{subtitle}</span>}
        </div>
      )}
      {!trend && subtitle && (
        <div className="text-xs text-gray-400">{subtitle}</div>
      )}
    </div>
  );
};

export default StatsCard;