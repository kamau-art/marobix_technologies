import { siteConfig } from '@/lib/site';
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  InstagramIcon,
} from './icons/BrandIcons';

const iconMap = {
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
};

export default function SocialLinksRow({ light = false }) {
  return (
    <ul className="flex gap-3">
      {Object.entries(siteConfig.social).map(([name, url]) => {
        const Icon = iconMap[name] || FacebookIcon;
        return (
          <li key={name}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Marobix on ${name}`}
              className={`inline-flex size-11 items-center justify-center rounded-full border transition-colors ${
                light
                  ? 'border-white/30 text-white hover:border-white hover:bg-white hover:text-primary'
                  : 'border-line text-secondary hover:border-primary hover:text-primary'
              }`}
            >
              <Icon className="size-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
