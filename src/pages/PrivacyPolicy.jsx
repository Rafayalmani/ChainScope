import React from 'react';
import { Shield, Lock, Eye, Database, Mail, Clock, FileText, CheckCircle } from 'lucide-react';

const PrivacyPolicy = () => {
  const lastUpdated = 'January 15, 2024';

  const sections = [
    {
      icon: <Database className="w-5 h-5 text-[#3B82F6]" />,
      title: 'Information We Collect',
      content: 'We collect wallet addresses you enter, blockchain data from public ledgers, and usage analytics to improve our service. We do not store private keys or personal identification information.'
    },
    {
      icon: <Lock className="w-5 h-5 text-[#3B82F6]" />,
      title: 'How We Use Your Information',
      content: 'Your wallet address is used only to fetch blockchain data from public ledgers. We do not sell, trade, or transfer your information to third parties. Analytics data helps us improve user experience.'
    },
    {
      icon: <Eye className="w-5 h-5 text-[#3B82F6]" />,
      title: 'Data Sharing',
      content: 'We share data only with blockchain RPC providers (Alchemy) to fetch on-chain information. All blockchain data is public by nature. We do not share personal information with advertisers.'
    },
    {
      icon: <Shield className="w-5 h-5 text-[#3B82F6]" />,
      title: 'Data Security',
      content: 'We implement industry-standard security measures to protect your data. All API requests are encrypted via HTTPS. No sensitive data is stored on our servers.'
    },
    {
      icon: <Clock className="w-5 h-5 text-[#3B82F6]" />,
      title: 'Data Retention',
      content: 'We do not permanently store wallet addresses or portfolio data. Information is fetched in real-time and not cached on our servers. Analytics data is anonymized and retained for 30 days.'
    },
    {
      icon: <Mail className="w-5 h-5 text-[#3B82F6]" />,
      title: 'Contact Us',
      content: 'For privacy concerns or questions, contact our Data Protection Officer at privacy@chainscope.io. We respond to all inquiries within 48 hours.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-[#3B82F6] rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
        </div>
        <p className="text-gray-500 text-lg">
          How we handle your data and protect your privacy
        </p>
        <div className="flex items-center space-x-2 mt-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <p className="text-sm text-gray-400">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Privacy at a Glance</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 🔍 We only access public blockchain data</li>
              <li>• 🚫 No private keys or personal info stored</li>
              <li>• 🔒 All data encrypted in transit</li>
              <li>• 📊 Anonymized analytics only</li>
              <li>• 🌐 Transparent about third-party providers</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Privacy Sections */}
      <div className="space-y-6 mb-8">
        {sections.map((section, index) => (
          <div key={index} className="bg-white border border-gray-100 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                {section.icon}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">{section.title}</h2>
                <p className="text-gray-600">{section.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Third Party Disclosure */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Third-Party Services</h2>
        <p className="text-gray-600 mb-4">
          We use the following third-party services to provide our functionality:
        </p>
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-700 mb-1">Alchemy</p>
            <p className="text-sm text-gray-500">Blockchain RPC provider - fetches on-chain data</p>
            <a href="#" className="text-xs text-[#3B82F6] hover:underline mt-1 inline-block">View Alchemy's Privacy Policy →</a>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-700 mb-1">CoinGecko</p>
            <p className="text-sm text-gray-500">Cryptocurrency price data</p>
            <a href="#" className="text-xs text-[#3B82F6] hover:underline mt-1 inline-block">View CoinGecko's Privacy Policy →</a>
          </div>
        </div>
      </div>

      {/* User Rights */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Rights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Right to Access</h3>
            <p className="text-sm text-gray-500">Request information about what data we have</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Right to Deletion</h3>
            <p className="text-sm text-gray-500">Request removal of your analytics data</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Right to Opt-Out</h3>
            <p className="text-sm text-gray-500">Disable analytics tracking</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Data Portability</h3>
            <p className="text-sm text-gray-500">Export your data in common format</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gradient-to-r from-[#3B82F6] to-blue-400 rounded-xl p-8 text-white">
        <h2 className="text-xl font-semibold mb-4">Questions About Privacy?</h2>
        <p className="mb-6 opacity-90">
          Our privacy team is here to help. Reach out with any concerns.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <a href="mailto:privacy@chainscope.io" className="inline-flex items-center justify-center px-4 py-2 bg-white text-[#3B82F6] rounded-lg font-medium hover:bg-gray-100 transition-colors">
            <Mail className="w-4 h-4 mr-2" />
            privacy@chainscope.io
          </a>
          <a href="#" className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
            <FileText className="w-4 h-4 mr-2" />
            Download Privacy Policy PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;