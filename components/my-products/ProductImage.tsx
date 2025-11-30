import React from 'react';

interface ProductImageProps {
  images?: string[];
  title: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProductImage: React.FC<ProductImageProps> = ({ 
  images, 
  title, 
  className = '', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  if (!images || images.length === 0) {
    return (
      <div className={`${sizeClasses[size]} bg-gray-300 rounded-lg flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-xs">No Image</span>
      </div>
    );
  }

  return (
    <img
      src={images[0]}
      alt={title}
      className={`${sizeClasses[size]} rounded-lg object-cover ${className}`}
    />
  );
};