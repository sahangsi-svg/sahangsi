import React from 'react';
import {
  UtensilsCrossed,
  Coffee,
  Recycle,
  ZapOff,
  Droplets,
  Sparkles,
  Trash2,
  Footprints,
  ShoppingBag,
  FileText,
  Sprout,
  ThermometerSun,
  HeartHandshake,
  CheckCircle2,
  Leaf
} from 'lucide-react';

interface ChallengeIconProps {
  name: string;
  className?: string;
}

export const ChallengeIcon: React.FC<ChallengeIconProps> = ({ name, className = 'w-6 h-6' }) => {
  switch (name) {
    case 'UtensilsCrossed':
      return <UtensilsCrossed className={className} />;
    case 'Coffee':
      return <Coffee className={className} />;
    case 'Recycle':
      return <Recycle className={className} />;
    case 'ZapOff':
      return <ZapOff className={className} />;
    case 'Droplets':
      return <Droplets className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Trash2':
      return <Trash2 className={className} />;
    case 'Footprints':
      return <Footprints className={className} />;
    case 'ShoppingBag':
      return <ShoppingBag className={className} />;
    case 'FileText':
      return <FileText className={className} />;
    case 'Sprout':
      return <Sprout className={className} />;
    case 'ThermometerSun':
      return <ThermometerSun className={className} />;
    case 'HeartHandshake':
      return <HeartHandshake className={className} />;
    default:
      return <Leaf className={className} />;
  }
};
