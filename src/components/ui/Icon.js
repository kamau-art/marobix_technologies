import {
  Code,
  ShoppingCart,
  Store,
  Package,
  HardDrive,
  Bot,
  Cloud,
  Headphones,
  Globe,
  Layers,
  Rocket,
  Wrench,
} from 'lucide-react';

const iconMap = {
  code: Code,
  'shopping-cart': ShoppingCart,
  store: Store,
  package: Package,
  'hard-drive': HardDrive,
  bot: Bot,
  cloud: Cloud,
  headphones: Headphones,
  globe: Globe,
  layers: Layers,
  rocket: Rocket,
  wrench: Wrench,
};

export default function Icon({ name, className, 'aria-hidden': ariaHidden = true }) {
  const IconComponent = iconMap[name] || Wrench;
  return <IconComponent className={className} aria-hidden={ariaHidden} />;
}
