/**
 * Footer Component
 * Site footer with links, contact info, and newsletter
 */

'use client';

import Link from 'next/link';
import { Logo } from './Logo';
import { Container, Icon, Input, Button } from '@/components/ui';
import { footerLinks, siteConfig } from '@/lib/constants';
import { cn } from '@/lib/utils';

// ============================================
// Component
// ============================================

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-secondary border-t border-card-border">
      {/* Main Footer Content */}
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Logo className="mb-6" />
            <p className="text-foreground-secondary text-sm leading-relaxed mb-6 max-w-sm">
              Evinizi veya işyerinizi 7/24 gözetim ve huzur sağlayan CCTV sistemleri ile güvende tutun. 
              Uzman ekibimiz kurulumdan uzaktan izlemeye kadar özel güvenlik çözümleri sunmaktadır.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <SocialLink href={siteConfig.links.facebook} label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </SocialLink>
              <SocialLink href={siteConfig.links.twitter} label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialLink>
              <SocialLink href={siteConfig.links.instagram} label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </SocialLink>
              <SocialLink href={siteConfig.links.youtube} label="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </SocialLink>
              <SocialLink href={siteConfig.links.whatsapp} label="WhatsApp">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </SocialLink>
            </div>
          </div>

          {/* Şirket Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Şirket</h3>
            <ul className="space-y-3">
              <li><FooterLink href="/">Anasayfa</FooterLink></li>
              <li><FooterLink href="#features">Hizmetlerimiz</FooterLink></li>
              <li><FooterLink href="#products">Projeler</FooterLink></li>
              <li><FooterLink href="#contact">Ücretsiz Teklif Al</FooterLink></li>
              <li><FooterLink href="#testimonials">Blog</FooterLink></li>
              <li><FooterLink href="#contact">İletişim</FooterLink></li>
            </ul>
          </div>

          {/* Kampanyalar Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Kampanyalar</h3>
            <ul className="space-y-3">
              <li><FooterLink href="/montaj-kampanyalarimiz">Montaj Kampanyaları</FooterLink></li>
              <li><FooterLink href="/montaj-kampanyalarimiz/4-kamerali-paket">4 Kameralı Paket</FooterLink></li>
              <li><FooterLink href="/montaj-kampanyalarimiz/6-kamerali-paket">6 Kameralı Paket</FooterLink></li>
              <li><FooterLink href="/montaj-kampanyalarimiz/8-kamerali-paket">8 Kameralı Paket</FooterLink></li>
              <li><FooterLink href="/montaj-kampanyalarimiz/10-kamerali-paket">10 Kameralı Paket</FooterLink></li>
              <li><FooterLink href="/urunler">Tüm Ürünler</FooterLink></li>
            </ul>
          </div>

          {/* Yasal Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Yasal</h3>
            <ul className="space-y-3">
              <li><FooterLink href="/yasal/kvkk">KVKK</FooterLink></li>
              <li><FooterLink href="/yasal/gizlilik-politikasi">Gizlilik Politikası</FooterLink></li>
              <li><FooterLink href="/yasal/cerez-politikasi">Çerez Politikası</FooterLink></li>
              <li><FooterLink href="/yasal/hizmet-sartlari">Hizmet Şartları</FooterLink></li>
              <li><FooterLink href="/yasal/mesafeli-satis">Mesafeli Satış Sözleşmesi</FooterLink></li>
              <li><FooterLink href="/yasal/iptal-iade">İptal ve İade</FooterLink></li>
            </ul>
          </div>

          {/* İletişim Bilgileri */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-foreground mb-4">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Icon name="phone" size={18} className="text-red-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-foreground-secondary">{siteConfig.contact.workingHours}</div>
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="text-foreground hover:text-red-500 transition-colors">
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="map-pin" size={18} className="text-red-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-foreground-secondary">Adres</div>
                  <a href={siteConfig.contact.mapUrl} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-red-500 transition-colors text-sm leading-relaxed">
                    Perpa Ticaret Merkezi<br />
                    A Blok Kat:9 No:1288, Şişli/İstanbul
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="mail" size={18} className="text-red-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-foreground-secondary">E-posta İletişim</div>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-foreground hover:text-red-500 transition-colors">
                    {siteConfig.contact.email}
                  </a>
                  <div className="text-xs text-foreground-secondary mt-1">Hızlı Yanıt</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-card-border">
        <Container className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-foreground-muted">
              Copyright {currentYear} - {siteConfig.name}
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-6 flex-wrap justify-center md:justify-end">
              <FooterLink href="/yasal/kvkk" className="text-xs">KVKK</FooterLink>
              <FooterLink href="/yasal/gizlilik-politikasi" className="text-xs">Gizlilik Politikası</FooterLink>
              <FooterLink href="/yasal/cerez-politikasi" className="text-xs">Çerez Politikası</FooterLink>
              <FooterLink href="/yasal/hizmet-sartlari" className="text-xs">Hizmet Şartları</FooterLink>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

// ============================================
// Sub-Components
// ============================================

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

function FooterLink({ href, children, className }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'text-sm text-foreground-secondary',
        'hover:text-foreground',
        'transition-colors duration-200',
        className
      )}
    >
      {children}
    </Link>
  );
}

interface SocialLinkProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

function SocialLink({ href, label, children }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'p-2 rounded-full',
        'text-foreground-secondary hover:text-foreground',
        'hover:bg-foreground/5',
        'transition-colors duration-200'
      )}
      aria-label={label}
    >
      {children}
    </a>
  );
}
