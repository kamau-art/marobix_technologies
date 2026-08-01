export default function MetricCallout({ label, value }) {
  return (
    <div className="rounded-xl border border-line bg-white p-6 text-center shadow-sm">
      <p className="font-heading text-3xl font-extrabold text-primary">{value}</p>
      <p className="mt-1 text-sm font-medium text-muted">{label}</p>
    </div>
  );
}
