import { AlertTriangle } from 'lucide-react';

export default function ErrorState({ message = 'Something went wrong. Please try again.' }) {
  return (
    <div role="alert" className="flex flex-col items-center gap-3 py-16 text-center">
      <AlertTriangle aria-hidden="true" className="size-8 text-error" />
      <p className="max-w-md text-sm text-muted">{message}</p>
    </div>
  );
}
