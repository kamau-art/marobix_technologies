import { Check } from 'lucide-react';

export default function IconListItem({ children }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-success/10 text-success"
        aria-hidden="true"
      >
        <Check className="size-4" />
      </span>
      <span className="text-secondary">{children}</span>
    </li>
  );
}
