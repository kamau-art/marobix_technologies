export default function MapEmbed({ address }) {
  const query = encodeURIComponent(address || 'Nairobi, Kenya');
  return (
    <div className="overflow-hidden rounded-xl border border-line">
      <iframe
        title="Marobix office location map"
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        className="h-72 w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
