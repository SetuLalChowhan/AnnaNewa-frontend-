import React from 'react';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusConfig = (status: string) => {
    const config = {
      active: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
      sold: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
      accepted: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
    };

    return config[status as keyof typeof config] || { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
  };

  const { bg, text, border } = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${bg} ${text} ${border} ${className}`}>
      {status}
    </span>
  );
};