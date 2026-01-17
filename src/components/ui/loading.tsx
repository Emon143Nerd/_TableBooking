import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

// Spinner Loading Component
export function SpinnerLoader({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <Loader2 className="w-full h-full text-[#d4af37]" />
    </motion.div>
  );
}

// Dots Loading Component
export function DotsLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 bg-[#d4af37] rounded-full"
          animate={{
            y: ['0%', '-50%', '0%'],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

// Pulse Loading Component
export function PulseLoader({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`w-16 h-16 bg-[#d4af37] rounded-full ${className}`}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [1, 0.5, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// Fork and Knife Loading Animation
export function ForkKnifeLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-20 h-20 ${className}`}>
      <motion.div
        className="absolute left-0 top-0"
        animate={{
          rotate: [0, 15, 0, -15, 0],
          x: [0, -5, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="30" height="60" viewBox="0 0 30 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="30" width="6" height="30" rx="2" fill="#d4af37" />
          <rect x="5" y="5" width="4" height="28" rx="2" fill="#d4af37" />
          <rect x="13" y="5" width="4" height="28" rx="2" fill="#d4af37" />
          <rect x="21" y="5" width="4" height="20" rx="2" fill="#d4af37" />
        </svg>
      </motion.div>
      
      <motion.div
        className="absolute right-0 top-0"
        animate={{
          rotate: [0, -15, 0, 15, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="30" height="60" viewBox="0 0 30 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="30" width="6" height="30" rx="2" fill="#d4af37" />
          <path d="M10 5 L20 5 L22 10 L20 20 L10 20 L8 10 Z" fill="#d4af37" />
        </svg>
      </motion.div>
    </div>
  );
}

// Pizza Slice Spinner
export function PizzaLoader({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
    >
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4 L44 44 L4 44 Z" fill="#FFA31A" />
        <circle cx="20" cy="30" r="3" fill="#DC2626" />
        <circle cx="28" cy="28" r="2.5" fill="#22C55E" />
        <circle cx="24" cy="38" r="2" fill="#78350F" />
        <circle cx="16" cy="38" r="2.5" fill="#DC2626" />
        <circle cx="32" cy="36" r="2" fill="#22C55E" />
      </svg>
    </motion.div>
  );
}

// Skeleton Loading Component
export function SkeletonLoader({ className = '', width = 'w-full', height = 'h-4' }: { className?: string; width?: string; height?: string }) {
  return (
    <motion.div
      className={`${width} ${height} bg-[#2a2a2a] rounded ${className}`}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// Card Skeleton
export function CardSkeleton() {
  return (
    <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#3a3a3a]">
      <SkeletonLoader height="h-48" className="mb-4" />
      <SkeletonLoader width="w-3/4" height="h-6" className="mb-2" />
      <SkeletonLoader width="w-1/2" height="h-4" className="mb-4" />
      <div className="flex gap-2">
        <SkeletonLoader width="w-20" height="h-8" />
        <SkeletonLoader width="w-20" height="h-8" />
      </div>
    </div>
  );
}

// Full Screen Loader
export function FullScreenLoader({ message = 'Loading...' }: { message?: string }) {
  return (
    <motion.div
      className="fixed inset-0 bg-[#0f0f0f] flex flex-col items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ForkKnifeLoader className="mb-8" />
      <motion.p
        className="text-[#d4af37] text-xl"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {message}
      </motion.p>
    </motion.div>
  );
}

// Loading Overlay
export function LoadingOverlay({ message = 'Processing...' }: { message?: string }) {
  return (
    <motion.div
      className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-40 rounded-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SpinnerLoader size="lg" className="mb-4" />
      <p className="text-white text-lg">{message}</p>
    </motion.div>
  );
}
