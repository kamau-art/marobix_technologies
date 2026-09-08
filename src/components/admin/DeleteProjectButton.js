'use client';

import { useFormStatus } from 'react-dom';
import { deleteProject } from '@/app/admin/actions';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="font-semibold text-error hover:underline disabled:opacity-50"
    >
      {pending ? 'Deleting…' : 'Delete'}
    </button>
  );
}

export default function DeleteProjectButton({ slug }) {
  return (
    <form
      action={deleteProject}
      onSubmit={(e) => {
        if (!window.confirm(`Delete this project? This cannot be undone.\n\n${slug}`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="slug" value={slug} />
      <Submit />
    </form>
  );
}