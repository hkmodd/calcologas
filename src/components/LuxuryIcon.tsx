
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface LuxuryIconProps {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'gold' | 'garda' | 'sunset';
  animated?: boolean;
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


export const LuxuryIcon: React.FC<LuxuryIconProps> = React.memo(({
  icon: Icon,
  size = 'md',
  variant = 'gold',
  animated = true,
  className = '',
}) => {
  const { container, icon } = sizeMap[size];
  const gradient = variantMap[variant];

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2
      }}
    >
      {/* Anelli di glow animati */}
      {animated && (
        <>
          <motion.div
            className={`absolute inset-0 ${container} rounded-full`}
            style={{
              background: variant === 'gold'
                ? 'radial-gradient(circle, rgba(255, 200, 50, 0.3) 0%, transparent 70%)'
                : variant === 'garda'
                  ? 'radial-gradient(circle, rgba(59, 180, 246, 0.3) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(255, 100, 50, 0.3) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className={`absolute inset-0 ${container} rounded-full border-2`}
            style={{
              borderColor: variant === 'gold'
                ? 'rgba(255, 200, 50, 0.3)'
                : variant === 'garda'
                  ? 'rgba(59, 180, 246, 0.3)'
                  : 'rgba(255, 100, 50, 0.3)',
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
          />
        </>
      )}

      {/* Container principale */}
      <motion.div
        className={`relative ${container} ${gradient} rounded-full flex items-center justify-center shadow-2xl`}
        style={{
          boxShadow: variant === 'gold'
            ? '0 10px 40px rgba(255, 200, 50, 0.4), inset 0 -2px 10px rgba(0, 0, 0, 0.2), inset 0 2px 10px rgba(255, 255, 255, 0.3)'
            : variant === 'garda'
              ? '0 10px 40px rgba(59, 180, 246, 0.4), inset 0 -2px 10px rgba(0, 0, 0, 0.2), inset 0 2px 10px rgba(255, 255, 255, 0.3)'
              : '0 10px 40px rgba(255, 100, 50, 0.4), inset 0 -2px 10px rgba(0, 0, 0, 0.2), inset 0 2px 10px rgba(255, 255, 255, 0.3)',
        }}
        whileHover={{
          scale: 1.1,
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={animated ? { rotate: [0, 5, -5, 0] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon className={`${icon} text-white drop-shadow-lg`} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
});
