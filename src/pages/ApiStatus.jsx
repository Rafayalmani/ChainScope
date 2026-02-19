import React from 'react';
import { Activity, CheckCircle, XCircle, Clock, AlertTriangle, BarChart3 } from 'lucide-react';

const ApiStatus = () => {
  const services = [
    {
      name: 'Ethereum Mainnet',
      status: 'operational',
      latency: '120ms',
      uptime: '99.99%',
      lastIncident: '30 days ago'
    },
    {
      name: 'BSC Mainnet',
      status: 'operational',
      latency: '95ms',
      uptime: '99.95%',
      lastIncident: '15 days ago'
    },
    {
      name: 'Polygon Mainnet',
      status: 'operational',
      latency: '110ms',
      uptime: '99.98%',
      lastIncident: '45 days ago'
    },
    {
      name: 'Arbitrum One',
      status: 'degraded',
      latency: '250ms',
      uptime: '99.90%',
      lastIncident: '2 hours ago'
    },
    {
      name: 'Base Mainnet',
      status: 'operational',
      latency: '105ms',
      uptime: '99.97%',
      lastIncident: '7 days ago'
    },
    {
      name: 'Authentication Service',
      status: 'operational',
      latency: '45ms',
      uptime: '100%',
      lastIncident: '60 days ago'
    },
    {
      name: 'Price Oracle',
      status: 'operational',
      latency: '80ms',
      uptime: '99.99%',
      lastIncident: '10 days ago'
    }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'down':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'operational':
        return 'Operational';
      case 'degraded':
        return 'Degraded Performance';
      case 'down':
        return 'Service Down';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-[#3B82F6] rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">API Status</h1>
        </div>
        <p className="text-gray-500 text-lg">
          Real-time status of ChainScope APIs and services
        </p>
      </div>

      {/* Overall Status */}
      <div className="bg-green-50 border border-green-100 rounded-xl p-6 mb-8">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <div>
            <h2 className="text-lg font-semibold text-green-800">All Systems Operational</h2>
            <p className="text-sm text-green-600">Last checked: 2 minutes ago</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <p className="text-sm text-gray-500 mb-1">Average Latency</p>
          <p className="text-3xl font-bold text-gray-900">115ms</p>
          <p className="text-xs text-green-600 mt-2">↓ 12ms from last hour</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <p className="text-sm text-gray-500 mb-1">Uptime (30d)</p>
          <p className="text-3xl font-bold text-gray-900">99.97%</p>
          <p className="text-xs text-gray-500 mt-2">3 incidents reported</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <p className="text-sm text-gray-500 mb-1">Requests (24h)</p>
          <p className="text-3xl font-bold text-gray-900">1.2M</p>
          <p className="text-xs text-green-600 mt-2">↑ 8% from yesterday</p>
        </div>
      </div>

      {/* Service Status Table */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Service Status</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {services.map((service, index) => (
            <div key={index} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                {getStatusIcon(service.status)}
                <div>
                  <p className="font-medium text-gray-900">{service.name}</p>
                  <p className="text-xs text-gray-500">Last incident: {service.lastIncident}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-sm text-gray-600">{service.latency}</p>
                  <p className="text-xs text-gray-400">Latency</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{service.uptime}</p>
                  <p className="text-xs text-gray-400">Uptime</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  service.status === 'operational' ? 'bg-green-100 text-green-700' :
                  service.status === 'degraded' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {getStatusText(service.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Uptime */}
      <div className="mt-8 bg-white border border-gray-100 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">30-Day Uptime History</h2>
        <div className="flex items-end space-x-1 h-24">
          {Array.from({ length: 30 }).map((_, i) => {
            const height = Math.floor(Math.random() * 30) + 70; // 70-100%
            const isDown = Math.random() > 0.95; // 5% chance of issue
            
            return (
              <div key={i} className="flex-1 flex flex-col items-center group relative">
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1">
                  {height}% uptime
                </div>
                <div 
                  className={`w-full ${isDown ? 'bg-red-400' : 'bg-[#3B82F6]'} rounded-t cursor-pointer`}
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-gray-400 mt-1">{i + 1}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ApiStatus;