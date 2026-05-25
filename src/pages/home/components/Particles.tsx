
import { motion } from 'motion/react';

interface ParticlesProps {
  className?: string;
}

export default function Particles({ className = '' }: ParticlesProps) {
  const particles = [
    { size: 'w-32 h-1', color: 'bg-yellow-400', position: 'top-20 left-10', rotation: 45 },
    { size: 'w-24 h-1', color: 'bg-yellow-300', position: 'top-40 right-20', rotation: -30 },
    { size: 'w-40 h-1.5', color: 'bg-yellow-500', position: 'bottom-32 left-1/4', rotation: 60 },
    { size: 'w-28 h-1', color: 'bg-white', position: 'top-1/3 right-1/3', rotation: -45 },
    { size: 'w-36 h-1.5', color: 'bg-yellow-200', position: 'bottom-20 right-16', rotation: 30 },
    { size: 'w-20 h-0.5', color: 'bg-yellow-400', position: 'top-60 left-1/3', rotation: -60 },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className={`absolute ${particle.size} ${particle.color} ${particle.position}`}
          style={{ rotate: particle.rotation }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{
            duration: 1,
            delay: index * 0.1,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 2,
          }}
        />
      ))}
    </div>
  );
}
