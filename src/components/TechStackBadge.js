export default function TechStackBadge({ tech }) {
  return (
    <span className="inline-flex items-center rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
      {tech}
    </span>
  );
}
