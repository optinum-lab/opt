/**
 * Service Schema Component
 * JSON-LD structured data for services offered by Mat Tech
 * Her hizmet için ayrı schema - SEO için optimize edilmiş
 */

interface ServiceSchemaProps {
  serviceName?: string;
}

export function ServiceSchema({ serviceName }: ServiceSchemaProps = {}) {
  // Tüm hizmetlerin schema'sı
  const allServices = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': 'https://www.mattech.com.tr/#services',
    name: 'Mat Tech Güvenlik Hizmetleri',
    description: 'Profesyonel güvenlik sistemleri kurulum ve bakım hizmetleri',
    numberOfItems: 9,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Service',
          '@id': 'https://www.mattech.com.tr/#guvenlik-kamerasi',
          name: 'Güvenlik Kamerası Sistemleri',
          alternateName: ['CCTV Kurulumu', 'IP Kamera Kurulumu', 'Kamera Sistemi'],
          description: 'Profesyonel CCTV ve IP kamera sistemleri kurulumu. Dahua ve Hikvision yetkili bayisi olarak 4K, gece görüşlü, PTZ kamera çözümleri. Ev, işyeri, fabrika ve site güvenliği.',
          provider: {
            '@type': 'LocalBusiness',
            name: 'Mat Tech',
            '@id': 'https://www.mattech.com.tr/#organization',
          },
          areaServed: {
            '@type': 'City',
            name: 'İstanbul',
          },
          serviceType: 'Güvenlik Kamerası Kurulumu',
          category: 'Güvenlik Sistemleri',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Kamera Çözümleri',
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'IP Kamera Kurulumu' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Analog Kamera Kurulumu' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'PTZ Kamera Kurulumu' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'DVR/NVR Kurulumu' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Uzaktan İzleme Kurulumu' } },
            ],
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Service',
          '@id': 'https://www.mattech.com.tr/#yangin-alarm',
          name: 'Yangın Alarm Sistemleri',
          alternateName: ['Yangın Algılama Sistemi', 'Fire Alarm System'],
          description: 'Konvansiyonel ve adresli yangın algılama sistemleri. Duman dedektörü, ısı dedektörü, yangın ihbar butonu ve alarm paneli kurulumu. İşyeri ve fabrika yangın güvenliği.',
          provider: {
            '@type': 'LocalBusiness',
            name: 'Mat Tech',
            '@id': 'https://www.mattech.com.tr/#organization',
          },
          areaServed: {
            '@type': 'City',
            name: 'İstanbul',
          },
          serviceType: 'Yangın Alarm Kurulumu',
          category: 'Yangın Güvenliği',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Yangın Alarm Çözümleri',
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Konvansiyonel Yangın Alarm' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Adresli Yangın Alarm' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Duman Dedektörü Kurulumu' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Yangın Paneli Kurulumu' } },
            ],
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'Service',
          '@id': 'https://www.mattech.com.tr/#hirsiz-alarm',
          name: 'Hırsız Alarm Sistemleri',
          alternateName: ['Ev Alarmı', 'İşyeri Alarmı', 'Güvenlik Alarmı'],
          description: 'Ev ve işyeri için kablosuz ve kablolu hırsız alarm sistemleri. Hareket sensörü, kapı/pencere sensörü, siren ve alarm paneli ile 7/24 güvenlik.',
          provider: {
            '@type': 'LocalBusiness',
            name: 'Mat Tech',
            '@id': 'https://www.mattech.com.tr/#organization',
          },
          areaServed: {
            '@type': 'City',
            name: 'İstanbul',
          },
          serviceType: 'Hırsız Alarm Kurulumu',
          category: 'Güvenlik Sistemleri',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Alarm Çözümleri',
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kablosuz Alarm Kurulumu' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kablolu Alarm Kurulumu' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hareket Sensörü Kurulumu' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Alarm Paneli Kurulumu' } },
            ],
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 4,
        item: {
          '@type': 'Service',
          '@id': 'https://www.mattech.com.tr/#bariyer',
          name: 'Bariyer Sistemleri',
          alternateName: ['Otopark Bariyeri', 'Araç Bariyeri', 'Otomatik Bariyer'],
          description: 'Otopark ve site girişleri için otomatik bariyer sistemleri. Kollu bariyer, hızlı bariyer ve mantar bariyer çözümleri ile araç giriş kontrolü.',
          provider: {
            '@type': 'LocalBusiness',
            name: 'Mat Tech',
            '@id': 'https://www.mattech.com.tr/#organization',
          },
          areaServed: {
            '@type': 'City',
            name: 'İstanbul',
          },
          serviceType: 'Bariyer Sistemi Kurulumu',
          category: 'Geçiş Kontrol',
        },
      },
      {
        '@type': 'ListItem',
        position: 5,
        item: {
          '@type': 'Service',
          '@id': 'https://www.mattech.com.tr/#turnike',
          name: 'Turnike Sistemleri',
          alternateName: ['Tripod Turnike', 'Tam Boy Turnike', 'Geçiş Turnikesi'],
          description: 'Personel ve ziyaretçi geçiş kontrolü için tripod ve tam boy turnike sistemleri. Kartlı, parmak izli ve yüz tanımalı geçiş seçenekleri.',
          provider: {
            '@type': 'LocalBusiness',
            name: 'Mat Tech',
            '@id': 'https://www.mattech.com.tr/#organization',
          },
          areaServed: {
            '@type': 'City',
            name: 'İstanbul',
          },
          serviceType: 'Turnike Sistemi Kurulumu',
          category: 'Geçiş Kontrol',
        },
      },
      {
        '@type': 'ListItem',
        position: 6,
        item: {
          '@type': 'Service',
          '@id': 'https://www.mattech.com.tr/#gecis-kontrol',
          name: 'Geçiş Kontrol Sistemleri',
          alternateName: ['Access Kontrol', 'Kartlı Geçiş Sistemi', 'Parmak İzi Sistemi', 'PDKS'],
          description: 'Kartlı geçiş, parmak izi okuyucu ve yüz tanıma sistemleri ile bina ve oda bazlı erişim kontrolü. PDKS entegrasyonu ile personel takibi.',
          provider: {
            '@type': 'LocalBusiness',
            name: 'Mat Tech',
            '@id': 'https://www.mattech.com.tr/#organization',
          },
          areaServed: {
            '@type': 'City',
            name: 'İstanbul',
          },
          serviceType: 'Geçiş Kontrol Kurulumu',
          category: 'Geçiş Kontrol',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Geçiş Kontrol Çözümleri',
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kartlı Geçiş Sistemi' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Parmak İzi Okuyucu' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Yüz Tanıma Sistemi' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'PDKS Entegrasyonu' } },
            ],
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 7,
        item: {
          '@type': 'Service',
          '@id': 'https://www.mattech.com.tr/#interkom',
          name: 'İnterkom ve Kapı Telefonu Sistemleri',
          alternateName: ['Görüntülü İnterkom', 'Daire Telefonu', 'Villa İnterkom'],
          description: 'Villa, apartman ve işyeri için görüntülü interkom ve kapı telefonu sistemleri. Dahua ve Hikvision interkom çözümleri.',
          provider: {
            '@type': 'LocalBusiness',
            name: 'Mat Tech',
            '@id': 'https://www.mattech.com.tr/#organization',
          },
          areaServed: {
            '@type': 'City',
            name: 'İstanbul',
          },
          serviceType: 'İnterkom Kurulumu',
          category: 'İletişim Sistemleri',
        },
      },
      {
        '@type': 'ListItem',
        position: 8,
        item: {
          '@type': 'Service',
          '@id': 'https://www.mattech.com.tr/#gsm-sinyal-guclendirici',
          name: 'GSM Sinyal Güçlendirici Sistemleri',
          alternateName: ['Cep Telefonu Sinyal Güçlendirici', 'GSM Repeater', 'Mobil Sinyal Amplifikatörü', '4G Sinyal Güçlendirici'],
          description: 'Bina içi zayıf GSM sinyalini güçlendiren profesyonel repeater sistemleri. Ofis, fabrika, AVM, bodrum kat ve asansörlerde kesintisiz cep telefonu çekimi. 4G/5G LTE desteği ile tüm operatörler için çözüm.',
          provider: {
            '@type': 'LocalBusiness',
            name: 'Mat Tech',
            '@id': 'https://www.mattech.com.tr/#organization',
          },
          areaServed: {
            '@type': 'City',
            name: 'İstanbul',
          },
          serviceType: 'GSM Sinyal Güçlendirici Kurulumu',
          category: 'Telekomünikasyon Sistemleri',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Sinyal Güçlendirici Çözümleri',
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'GSM Repeater Kurulumu' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '4G/LTE Sinyal Güçlendirici' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '5G Sinyal Güçlendirici' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Çoklu Operatör Çözümü' } },
            ],
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 9,
        item: {
          '@type': 'Service',
          '@id': 'https://www.mattech.com.tr/#plaka-tanima',
          name: 'Plaka Tanıma Sistemleri',
          alternateName: ['ANPR Sistemi', 'LPR Kamera', 'Araç Plaka Okuma', 'Otopark Plaka Tanıma', 'Otomatik Plaka Tanıma'],
          description: 'ANPR/LPR teknolojisi ile yüksek doğruluklu araç plaka tanıma sistemleri. Otopark giriş-çıkış yönetimi, site ve fabrika araç takibi, bariyer entegrasyonu. Plaka tabanlı geçiş kontrolü ile güvenli ve hızlı araç geçişi.',
          provider: {
            '@type': 'LocalBusiness',
            name: 'Mat Tech',
            '@id': 'https://www.mattech.com.tr/#organization',
          },
          areaServed: {
            '@type': 'City',
            name: 'İstanbul',
          },
          serviceType: 'Plaka Tanıma Sistemi Kurulumu',
          category: 'Araç Geçiş Kontrol',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Plaka Tanıma Çözümleri',
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ANPR Kamera Kurulumu' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Otopark Plaka Tanıma' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bariyer Entegrasyonu' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Araç Takip Sistemi' } },
            ],
          },
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(allServices) }}
    />
  );
}

/**
 * FAQ Schema - Sık Sorulan Sorular
 * SEO için zengin snippet desteği
 */
export function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://www.mattech.com.tr/#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Güvenlik kamerası kurulumu ne kadar sürer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Standart bir ev veya küçük işyeri için güvenlik kamerası kurulumu genellikle 1-2 gün içinde tamamlanır. Büyük projeler için süre, kamera sayısı ve alana göre değişebilir. Ücretsiz keşif sonrası size net süre bilgisi verilir.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hangi marka güvenlik kameralarını satıyorsunuz?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mat Tech olarak Dahua ve Hikvision yetkili bayisiyiz. Bu iki dünya markası, profesyonel güvenlik çözümleri için en güvenilir seçeneklerdir. Her bütçeye uygun modeller sunuyoruz.',
        },
      },
      {
        '@type': 'Question',
        name: 'Yangın alarm sistemi zorunlu mu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Evet, Türkiye\'de işyerleri için yangın alarm sistemi yasal zorunluluktur. Binaların Yangından Korunması Hakkında Yönetmelik gereği işyerlerinde yangın algılama ve uyarı sistemi bulunması gerekir.',
        },
      },
      {
        '@type': 'Question',
        name: 'Güvenlik kameralarını telefondan izleyebilir miyim?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Evet, kurduğumuz tüm IP kamera sistemleri mobil uygulama desteği sunar. iPhone ve Android cihazlardan canlı izleme, kayıt oynatma ve bildirim alma özellikleri mevcuttur.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kurulum sonrası teknik destek sağlıyor musunuz?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Evet, Mat Tech olarak 7/24 teknik destek hizmeti sunuyoruz. Kurulum sonrası oluşabilecek her türlü sorunda WhatsApp veya telefon ile bize ulaşabilirsiniz.',
        },
      },
      {
        '@type': 'Question',
        name: 'Bariyer ve turnike sistemleri için bakım hizmeti var mı?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Evet, tüm bariyer ve turnike sistemlerimiz için periyodik bakım hizmeti sunuyoruz. Düzenli bakım, sistemlerinizin uzun ömürlü ve sorunsuz çalışmasını sağlar.',
        },
      },
      {
        '@type': 'Question',
        name: 'GSM sinyal güçlendirici nedir, nasıl çalışır?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GSM sinyal güçlendirici (repeater), bina içinde zayıf olan cep telefonu sinyalini güçlendiren bir cihaztır. Dış anten ile alınan sinyal, amplifikatör ile güçlendirilip iç antene iletilir. Böylece bodrum kat, asansör, ofis ve fabrikalarda kesintisiz cep telefonu çekimi sağlanır. 4G/5G LTE desteği ile tüm operatörlerde çalışır.',
        },
      },
      {
        '@type': 'Question',
        name: 'GSM sinyal güçlendirici yasal mı?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Evet, BTK (Bilgi Teknolojileri ve İletişim Kurumu) onaylı ve lisanslı GSM sinyal güçlendiriciler yasaldır. Mat Tech olarak sadece yasal ve sertifikalı ürünler satıp kuruyoruz.',
        },
      },
      {
        '@type': 'Question',
        name: 'Plaka tanıma sistemi nasıl çalışır?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Plaka tanıma sistemleri (ANPR/LPR), özel kameralar ve yapıy zeka yazılımı ile araç plakalarını otomatik olarak okur. Otopark giriş-çıkışı, site ve fabrika araç takibi, bariyer entegrasyonu gibi amaçlarla kullanılır. Kayıtlı plakalar için otomatik bariyer açma özelliği sağlar.',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
