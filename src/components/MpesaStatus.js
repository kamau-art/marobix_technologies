'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function MpesaStatus({ orderId }) {
  const router = useRouter();
  const active = useRef(true);

  useEffect(() => {
    let timer;
    async function poll() {
      if (!active.current) return;
      let status = 'pending';
      try {
        const res = await fetch(`/api/mpesa/status?order=${encodeURIComponent(orderId)}`, {
          cache: 'no-store',
        });
        const data = await res.json().catch(() => ({}));
        status = data.status || 'pending';
      } catch {
        /* keep polling */
      }
      if (status !== 'pending') {
        active.current = false;
        router.refresh();
        return;
      }
      timer = setTimeout(poll, 3000);
    }
    timer = setTimeout(poll, 2000);
    return () => {
      active.current = false;
      clearTimeout(timer);
    };
  }, [orderId, router]);

  return (
    <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted">
      <Loader2 aria-hidden="true" className="size-4 animate-spin" />
      Waiting for payment confirmation…
    </p>
  );
}
