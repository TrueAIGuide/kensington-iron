"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/memberships", label: "Memberships" },
    { href: "/facilities", label: "Facilities" },
    { href: "/coaches", label: "Coaches" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-surface-variant/50">
      <div className="max-w-7xl mx-auto px-6 h-20 grid grid-cols-3 items-center">
        <div className="flex justify-start">
          <Link href="/" className="font-display tracking-widest text-lg text-primary font-bold flex items-center gap-3">
            <img src="/logo.png" alt="Kensington Iron Logo" className="w-8 h-8 object-contain" />
            Kensington Iron
          </Link>
        </div>
        <div className="hidden md:flex justify-center gap-8 text-[11px] font-bold uppercase tracking-widest font-body text-on-surface">
          {links.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`hover:text-primary transition-colors pb-1 border-b-2 ${
                pathname === link.href ? "border-primary text-primary" : "border-transparent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex justify-end">
          <Button href="/memberships" variant="primary" className="!px-6 !py-3 !text-[10px]">JOIN NOW</Button>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-surface-container-lowest py-16 md:py-24 border-t border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        <div className="md:col-span-4">
          <Link href="/" className="font-display tracking-widest text-lg text-primary font-bold flex items-center gap-3 mb-6">
            <img src="/logo.png" alt="Kensington Iron Logo" className="w-8 h-8 object-contain" />
            Kensington Iron
          </Link>
          <p className="text-on-surface-variant font-body text-xs leading-relaxed max-w-sm">
            A meticulously curated environment offering the foundation for physical performance in the heart of Mayfair.
          </p>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="font-display text-xs tracking-widest uppercase mb-6 text-on-surface font-bold">Explore</h4>
          <ul className="flex flex-col gap-4 font-body text-xs text-on-surface-variant">
            <li><Link href="/facilities" className="hover:text-primary transition-colors">Facilities</Link></li>
            <li><Link href="/coaches" className="hover:text-primary transition-colors">Coaches</Link></li>
            <li><Link href="/memberships" className="hover:text-primary transition-colors">Memberships</Link></li>
          </ul>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="font-display text-xs tracking-widest uppercase mb-6 text-on-surface font-bold">Connect</h4>
          <ul className="flex flex-col gap-4 font-body text-xs text-on-surface-variant">
            <li><Link href="#" className="hover:text-primary transition-colors">Instagram</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Twitter</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4 flex flex-col justify-between items-start md:items-end gap-12 md:gap-0">
          <ul className="flex gap-6 font-body text-xs text-on-surface-variant">
            <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Terms</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Conditions</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Press</Link></li>
          </ul>
          <p className="text-on-surface-variant font-body text-[10px] uppercase tracking-wider">
            © 2024 Kensington Iron.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function Button({ 
  variant = 'primary', 
  children,
  className = "",
  href,
  disabled,
  onClick
}: { 
  variant?: 'primary' | 'secondary' | 'tertiary',
  children: ReactNode,
  className?: string,
  href?: string,
  disabled?: boolean,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}) {
  const baseClasses = "inline-flex items-center justify-center font-body uppercase tracking-widest text-xs transition-all";
  let variantClasses = "";
  
  if (variant === 'primary') {
    variantClasses = "bg-gradient-primary text-[#131313] font-bold rounded-sm px-8 py-4 hover:brightness-110 shadow-lg shadow-black/40 disabled:opacity-70 disabled:pointer-events-none";
  } else if (variant === 'secondary') {
    variantClasses = "ghost-border text-primary rounded-sm px-8 py-4 hover:bg-surface-variant/20 disabled:opacity-70 disabled:pointer-events-none";
  } else if (variant === 'tertiary') {
    variantClasses = "text-primary underline underline-offset-4 decoration-[0.5px] decoration-primary/50 hover:decoration-primary disabled:opacity-70 disabled:pointer-events-none";
  }

  const combinedClasses = `${baseClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
