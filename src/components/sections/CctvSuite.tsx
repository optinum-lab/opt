/**
 * CCTV Suite Section
 * Focused capabilities for CCTV solutions
 */

'use client';

import { motion } from 'motion/react';
import { Container, Card, Icon, Badge } from '@/components/ui';
import { staggerContainer, staggerChild, fadeUp, defaultViewport } from '@/lib/animations';

const cctvItems = [
  {
    title: '7/24 Canlı İzleme',
    desc: 'Gerçek zamanlı görüntü, anlık alarm ve mobil push ile anında müdahale.',
    icon: 'eye'
  },
  {
    title: '4K / H.265+ Kayıt',
    desc: 'Ultra net görüntü ve %50+ bant genişliği tasarrufu, kesintisiz arşiv.',
    icon: 'camera'
  },
  {
    title: 'Akıllı Analitik',
    desc: 'İnsan/araç ayrımı, çizgi geçişi, bölge ihlali ve paket takibi.',
    icon: 'cpu'
  },
  {
    title: 'PTZ ve Zoom',
    desc: 'Otomatik devriye, 360° kapsama ve optik zoom ile kritik detay.',
    icon: 'zoom-in'
  },
  {
    title: 'Uzak Erişim',
    desc: 'Mobil/masaüstü uygulama, çoklu kullanıcı yetkilendirme ve şifreli bağlantı.',
    icon: 'wifi'
  },
  {
    title: 'Yedekli Kayıt',
    desc: 'Bulut + NVR yedekliliği, disk arızasında dahi veri kaybını önler.',
    icon: 'cloud'
  },
];

export function CctvSuite() {
  return (
    <section id="cctv" className="py-20 md:py-28 bg-gradient-to-b from-background to-background/60">
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center max-w-4xl mx-auto mb-14"
        >
          <Badge variant="primary" className="mb-4 px-4 py-1.5 rounded-full border-red-500/40 text-red-500">
            CCTV Çözümleri
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Kritik Alanlar İçin CCTV Paketi
          </h2>
          <p className="text-lg text-foreground-secondary leading-relaxed">
            Depo, fabrika, site ve mağazalar için uçtan uca kamera, kayıt, ağ ve alarm entegrasyonunu tek pakette sunuyoruz.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {cctvItems.map((item) => (
            <motion.div key={item.title} variants={staggerChild}>
              <Card className="h-full border border-red-500/10 bg-card/60 backdrop-blur">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center">
                    <Icon name={item.icon} size={22} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
