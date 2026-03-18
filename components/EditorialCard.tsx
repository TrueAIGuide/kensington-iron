export function EditorialCard({
  title,
  subtitle,
  children,
  className = ""
}: {
  title?: React.ReactNode,
  subtitle?: React.ReactNode,
  children: React.ReactNode,
  className?: string
}) {
  return (
    <div className={`bg-surface-container-low rounded-md p-8 md:p-12 transition-transform duration-500 hover:-translate-y-1 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-12">
          {title && <h3 className="font-display text-3xl tracking-tight mb-4">{title}</h3>}
          {subtitle && <p className="font-body text-on-surface-variant text-lg max-w-2xl">{subtitle}</p>}
        </div>
      )}
      <div className="flex flex-col gap-8">
        {children}
      </div>
    </div>
  );
}
