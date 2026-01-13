/**
 * Contact Section Component
 * Modern Apple/Dribbble style contact section
 */

'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Container, Button, Input, Textarea, Icon } from '@/components/ui';
import {
  fadeUp,
  staggerContainer,
  staggerChild,
  defaultViewport,
} from '@/lib/animations';
import { siteConfig } from '@/lib/constants';

// ============================================
// Component
// ============================================

export function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Reset form
    setFormState({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
    
    // Show success message (in real app, use toast notification)
    alert('Teşekkürler! En kısa sürede sizinle iletişime geçeceğiz.');
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-[120px]" />
      </div>

      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={defaultViewport}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 text-red-500 font-medium text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Bizimle İletişime Geçin
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="text-foreground">İletişim</span>
          </h2>
          <p className="text-foreground-secondary">
            Güvenlik ihtiyaçlarınız için 7/24 yanınızdayız. Ücretsiz keşif ve teklif için hemen bize ulaşın.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Side - Contact Info Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="lg:col-span-2 space-y-4"
          >
            {/* Phone Card */}
            <motion.a
              variants={staggerChild}
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              className="group block p-5 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-white/5 hover:border-red-500/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0 shadow-lg shadow-red-500/20 group-hover:scale-105 transition-transform">
                  <Icon name="phone" size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-foreground-secondary mb-1">{siteConfig.contact.workingHours}</p>
                  <p className="text-lg font-semibold text-foreground group-hover:text-red-500 transition-colors">
                    {siteConfig.contact.phone}
                  </p>
                </div>
              </div>
            </motion.a>

            {/* Email Card */}
            <motion.a
              variants={staggerChild}
              href={`mailto:${siteConfig.contact.email}`}
              className="group block p-5 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-white/5 hover:border-red-500/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shrink-0 shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
                  <Icon name="mail" size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-foreground-secondary mb-1">E-posta İletişim</p>
                  <p className="text-lg font-semibold text-foreground group-hover:text-red-500 transition-colors">
                    {siteConfig.contact.email}
                  </p>
                  <p className="text-xs text-foreground-secondary mt-1">Hızlı Yanıt</p>
                </div>
              </div>
            </motion.a>

            {/* Address Card */}
            <motion.a
              variants={staggerChild}
              href={siteConfig.contact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-5 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-white/5 hover:border-red-500/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center shrink-0 shadow-lg shadow-red-400/20 group-hover:scale-105 transition-transform">
                  <Icon name="map-pin" size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-foreground-secondary mb-1">Adres</p>
                  <p className="text-sm font-medium text-foreground group-hover:text-red-500 transition-colors leading-relaxed">
                    {siteConfig.contact.address}
                  </p>
                </div>
              </div>
            </motion.a>

            {/* WhatsApp CTA */}
            <motion.a
              variants={staggerChild}
              href={siteConfig.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp ile Hızlı İletişim
            </motion.a>

            {/* Map */}
            <motion.div
              variants={staggerChild}
              className="rounded-2xl overflow-hidden border border-white/5 h-48"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.1234!2d28.9847!3d41.0603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPerpa%20Ticaret%20Merkezi!5e0!3m2!1str!2str!4v1705000000000!5m2!1str!2str" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mat Tech Güvenlik Sistemleri - Perpa Ticaret Merkezi Konum"
                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            </motion.div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={defaultViewport}
            className="lg:col-span-3"
          >
            <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-xl border border-white/5 shadow-xl">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Ücretsiz Teklif Alın
              </h3>
              <p className="text-sm text-foreground-secondary mb-6">
                Formu doldurun, 24 saat içinde size dönelim.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    label="Ad Soyad"
                    type="text"
                    placeholder="Ahmet Yılmaz"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                  />
                  <Input
                    label="Telefon"
                    type="tel"
                    placeholder="+90 (555) 123 4567"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    required
                  />
                </div>
                <Input
                  label="E-posta"
                  type="email"
                  placeholder="ahmet@ornek.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  required
                />
                <Textarea
                  label="Mesaj"
                  placeholder="Güvenlik ihtiyaçlarınızı bize anlatın..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full gradient-primary text-white rounded-xl"
                  loading={isSubmitting}
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                  {!isSubmitting && <Icon name="arrow-right" size={18} />}
                </Button>
              </form>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-red-500">Hızlı</div>
                    <div className="text-xs text-foreground-secondary">Yanıt</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-500">Ücretsiz</div>
                    <div className="text-xs text-foreground-secondary">Keşif Hizmeti</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-500">2 Yıl</div>
                    <div className="text-xs text-foreground-secondary">Garanti</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Features */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          {[
            { icon: 'clock', title: 'Hızlı Yanıt', desc: 'Tüm taleplere 24 saat içinde yanıt veriyoruz.' },
            { icon: 'map-pin', title: 'Ücretsiz Keşif', desc: 'İstanbul ve çevre illerde ücretsiz keşif hizmeti.' },
            { icon: 'shield', title: '2 Yıl Garanti', desc: 'Tüm kurulum ve hizmetlerde 2 yıl garanti.' },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={staggerChild}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-card/50 to-transparent border border-white/5"
            >
              <div className="w-12 h-12 mx-auto rounded-xl gradient-primary flex items-center justify-center mb-4">
                <Icon name={item.icon} size={24} className="text-white" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
              <p className="text-sm text-foreground-secondary">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
