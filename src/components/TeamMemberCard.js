import Image from 'next/image';

export default function TeamMemberCard({ member }) {
  return (
    <figure className="group overflow-hidden rounded-xl border border-line bg-white text-center shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-surface">
        {member.image ? (
          <Image
            src={member.image}
            alt={`${member.name} — ${member.role}`}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-primary text-white">
            {member.name}
          </div>
        )}
      </div>
      <figcaption className="p-4">
        <p className="font-heading font-bold text-secondary">{member.name}</p>
        <p className="mt-0.5 text-sm text-muted">{member.role}</p>
      </figcaption>
    </figure>
  );
}
