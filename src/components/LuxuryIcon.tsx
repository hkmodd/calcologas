
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface LuxuryIconProps {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'gold' | 'garda' | 'sunset';
  className?: string;
}

const sizeMap = {
  sm: { container: 'w-10 h-10', icon: 'w-5 h-5' },
  md: { container: 'w-14 h-14', icon: 'w-7 h-7' },
  lg: { container: 'w-18 h-18', icon: 'w-9 h-9' },
  xl: { container: 'w-24 h-24', icon: 'w-12 h-12' },
};

const variantMap = {
  gold: 'gold-gradient',
  garda: 'garda-gradient',
  sunset: 'garda-sunset',
};

// Performance-optimized LuxuryIcon - no infinite JS animations
export const LuxuryIcon: React.FC<LuxuryIconProps> = React.memo(({
  icon: Icon,
  size = 'md',
  variant = 'gold',
  className = '',
}) => {
  const { container, icon } = sizeMap[size];
  const gradient = variantMap[variant];

  const shadowColor = variant === 'gold'
    ? 'rgba(255, 200, 50, 0.3)'
    : variant === 'garda'
      ? 'rgba(59, 180, 246, 0.3)'
      : 'rgba(255, 100, 50, 0.3)';

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Static glow ring - no animation */}
      <div
        className={`absolute inset-0 ${container} rounded-full opacity-50`}
        style={{
          background: `radial-gradient(circle, ${shadowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Main container - hover only, no infinite animation */}
      <motion.div
        className={`relative ${container} ${gradient} rounded-full flex items-center justify-center`}
        style={{
          boxShadow: `0 8px 24px ${shadowColor}`,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon className={`${icon} text-white drop-shadow-lg`} />
      </motion.div>
    </motion.div>
  );
});

LuxuryIcon.displayName = 'LuxuryIcon';
