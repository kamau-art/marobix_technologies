import { Loader2 } from 'lucide-react';

export default function LoadingState({ label = 'Loading…' }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-3 py-16 text-muted"
    >
      <Loader2 aria-hidden="true" className="size-8 animate-spin text-primary" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
