import Image from 'next/image';

function initials(name) {
  return name
    .replace(/^Marobix\s+/, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export default function TeamMemberCard({ member }) {
  return (
    <figure className="group rounded-2xl border border-line bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-lg">
      <div className="mx-auto size-32 rounded-full bg-gradient-to-br from-brand-magenta to-brand-orange p-1">
        <div className="size-full overflow-hidden rounded-full bg-surface">
          {member.image ? (
            <Image
              src={member.image}
              alt={`${member.name} — ${member.role}`}
              width={160}
              height={160}
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-brand-pink to-brand-orange font-heading text-3xl font-extrabold text-white">
              {initials(member.name)}
            </div>
          )}
        </div>
      </div>
      <figcaption className="mt-5">
        <p className="font-heading text-lg font-bold text-secondary">{member.name}</p>
        <p className="mt-1 text-sm font-medium text-muted">{member.role}</p>
      </figcaption>
    </figure>
  );
}