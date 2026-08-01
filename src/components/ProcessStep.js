export default function ProcessStep({ step, title, description, isLast }) {
  return (
    <li className="relative flex flex-col gap-3 pl-0">
      <div className="flex items-center gap-3">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-white"
          aria-hidden="true"
        >
          {step}
        </span>
        {!isLast && (
          <span aria-hidden="true" className="hidden h-px flex-1 bg-line sm:block" />
        )}
      </div>
      <div>
        <h3 className="font-heading text-base font-bold text-secondary">{title}</h3>
        {description && (
          <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p>
        )}
      </div>
    </li>
  );
}
