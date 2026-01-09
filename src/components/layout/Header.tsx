/**
 * Header Component
 * Premium modern navigation with glassmorphism effect
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { Button, Container, Icon } from '@/components/ui';
import { navLinks, siteConfig } from '@/lib/constants';
import { cn } from '@/lib/utils';

// ============================================
// Component
// ============================================

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Detect active section
      const sections = navLinks.map(link => link.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Outer wrapper with padding when scrolled */}
        <div
          className={cn(
            'w-full transition-all duration-500 ease-out',
            isScrolled ? 'px-4 md:px-8 pt-4' : 'px-0 pt-0'
          )}
        >
          {/* Inner header container */}
          <motion.div
            initial={false}
            animate={{
              borderRadius: isScrolled ? 24 : 0,
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={cn(
              'mx-auto transition-all duration-500 ease-out',
              isScrolled
                ? 'max-w-6xl bg-background/70 dark:bg-background/60 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/20 dark:border-white/10'
                : 'max-w-full bg-transparent border-transparent'
            )}
          >
            <Container className={cn(isScrolled && '!px-6 md:!px-8')}>
              <nav
                className={cn(
                  'flex items-center justify-between transition-all duration-500',
                  isScrolled ? 'h-16' : 'h-20 md:h-24'
                )}
              >
                {/* Logo */}
                <motion.div
                  initial={false}
                  animate={{ scale: isScrolled ? 0.9 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Logo />
                </motion.div>

                {/* Desktop Navigation - Centered Pill Style */}
                <div className="hidden lg:flex items-center flex-shrink-0">
                  <div className={cn(
                    'flex items-center gap-1 p-1.5 rounded-full transition-all duration-300',
                    isScrolled 
                      ? 'bg-foreground/[0.03] dark:bg-white/[0.05]' 
                      : 'bg-foreground/[0.05] dark:bg-white/[0.08]'
                  )}>
                    {navLinks.map((link) => {
                      const isActive = activeSection === link.href.replace('#', '');
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            'relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300',
                            isActive 
                              ? 'text-white' 
                              : 'text-foreground-secondary hover:text-foreground'
                          )}
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="activeNavPill"
                              className="absolute inset-0 bg-gradient-to-r from-[#E31E24] to-[#ff4d52] rounded-full"
                              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                          <span className="relative z-10">{link.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Desktop Actions */}
                <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
                  <ThemeToggle />
                  
                  {/* Phone Number with Icon */}
                  <a 
                    href={`tel:${siteConfig.contact.phone}`}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                      'text-foreground-secondary hover:text-foreground',
                      'hover:bg-foreground/5 dark:hover:bg-white/5'
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Icon name="phone" size={16} className="text-green-500" />
                    </div>
                    <span className="hidden xl:block">{siteConfig.contact.phone}</span>
                  </a>

                  {/* CTA Button */}
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-[#E31E24] to-[#ff4d52] hover:from-[#c91a1f] hover:to-[#e63e43] text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 rounded-full px-6"
                  >
                    <Icon name="messageCircle" size={16} className="mr-2" />
                    Ücretsiz Teklif
                  </Button>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex lg:hidden items-center gap-3">
                  <ThemeToggle />
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={cn(
                      'relative w-10 h-10 rounded-full flex items-center justify-center',
                      'bg-foreground/5 dark:bg-white/10',
                      'hover:bg-foreground/10 dark:hover:bg-white/15',
                      'transition-colors duration-200'
                    )}
                    aria-label={isMobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
                    aria-expanded={isMobileMenuOpen}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-5 h-4 flex flex-col justify-center items-center">
                      <motion.span
                        animate={{
                          rotate: isMobileMenuOpen ? 45 : 0,
                          y: isMobileMenuOpen ? 2 : -3,
                        }}
                        className="w-5 h-0.5 bg-foreground rounded-full absolute"
                        transition={{ duration: 0.3 }}
                      />
                      <motion.span
                        animate={{
                          opacity: isMobileMenuOpen ? 0 : 1,
                          scaleX: isMobileMenuOpen ? 0 : 1,
                        }}
                        className="w-5 h-0.5 bg-foreground rounded-full absolute"
                        transition={{ duration: 0.2 }}
                      />
                      <motion.span
                        animate={{
                          rotate: isMobileMenuOpen ? -45 : 0,
                          y: isMobileMenuOpen ? -2 : 3,
                        }}
                        className="w-5 h-0.5 bg-foreground rounded-full absolute"
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.button>
                </div>
              </nav>
            </Container>
          </motion.div>
        </div>
      </header>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] lg:hidden"
          >
            {/* Background with blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/95 dark:bg-background/98 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Content */}
            <div className="relative h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6">
                <Logo />
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-foreground/5 dark:bg-white/10 flex items-center justify-center"
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon name="x" size={20} />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 flex flex-col justify-center px-6 -mt-20">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      delay: index * 0.08,
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group block py-4 border-b border-foreground/5 dark:border-white/5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-3xl md:text-4xl font-semibold text-foreground group-hover:text-[#E31E24] transition-colors duration-300">
                          {link.label}
                        </span>
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          whileHover={{ x: 0, opacity: 1 }}
                          className="w-10 h-10 rounded-full bg-[#E31E24]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Icon name="arrowRight" size={20} className="text-[#E31E24]" />
                        </motion.div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="p-6 space-y-4"
              >
                {/* CTA Button */}
                <Button 
                  className="w-full h-14 bg-gradient-to-r from-[#E31E24] to-[#ff4d52] hover:from-[#c91a1f] hover:to-[#e63e43] text-white text-lg font-semibold shadow-lg shadow-red-500/25 rounded-2xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon name="messageCircle" size={20} className="mr-2" />
                  Ücretsiz Teklif Al
                </Button>

                {/* Contact Info */}
                <div className="flex items-center justify-center gap-6 pt-4">
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="flex items-center gap-2 text-foreground-secondary hover:text-[#E31E24] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Icon name="phone" size={18} className="text-green-500" />
                    </div>
                    <span className="text-sm font-medium">Ara</span>
                  </a>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-center gap-2 text-foreground-secondary hover:text-[#E31E24] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Icon name="mail" size={18} className="text-blue-500" />
                    </div>
                    <span className="text-sm font-medium">E-posta</span>
                  </a>
                  <a
                    href={`https://wa.me/905454506587`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-foreground-secondary hover:text-[#E31E24] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-medium">WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
