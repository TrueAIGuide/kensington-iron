export function CinematicScroller({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <section className="bg-surface-container-lowest w-full py-24 my-16 overflow-hidden">
      <div className="flex gap-8 px-6 md:px-16 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
        {children}
      </div>
    </section>
  );
}

export function ScrollerItem({
  imageUrl,
  title,
  subtitle
}: {
  imageUrl: string,
  title: string,
  subtitle?: string
}) {
  return (
    <div className="relative shrink-0 w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] rounded-md overflow-hidden snap-center group">
      <div className="absolute inset-0 bg-surface">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-8 md:p-12">
        <h3 className="font-display text-4xl md:text-5xl text-on-surface mb-4">{title}</h3>
        {subtitle && <p className="font-body text-lg text-on-surface-variant max-w-xl">{subtitle}</p>}
      </div>
    </div>
  );
}
