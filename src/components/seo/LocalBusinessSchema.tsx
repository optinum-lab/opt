/**
 * LocalBusiness Schema Component
 * JSON-LD structured data for local SEO - Mat Tech İstanbul
 * Yerel arama sonuçlarında görünürlük için optimize edilmiş
 */

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SecurityCompany',
    '@id': 'https://www.mattech.com.tr/#localbusiness',
    name: 'Mat Tech Güvenlik Sistemleri',
    alternateName: [
      'mattech',
      'mat tech',
      'MatTech',
      'MATTECH',
      'MAT TECH',
      'Mat Tech',
      'mattech güvenlik',
      'mat tech güvenlik',
      'mattech güvenlik sistemleri',
      'mat tech güvenlik sistemleri',
      'mattech istanbul',
      'mat tech istanbul',
      'mattech perpa',
      'mat tech perpa',
      'mattech kamera',
      'mat tech kamera',
    ],
    description:
      'İstanbul Perpa\'da güvenlik kamerası, yangın alarm sistemi, hırsız alarmı, bariyer, turnike ve geçiş kontrol sistemleri satış ve kurulum hizmeti. Dahua ve Hikvision yetkili bayisi.',
    url: 'https://www.mattech.com.tr',
    telephone: '+90-545-450-6587',
    email: 'info@mattech.com.tr',
    image: [
      'https://www.mattech.com.tr/og-image.png',
      'https://www.mattech.com.tr/logo.png',
    ],
    logo: 'https://www.mattech.com.tr/logo.png',
    priceRange: '₺₺',
    currenciesAccepted: 'TRY',
    paymentAccepted: ['Nakit', 'Kredi Kartı', 'Havale/EFT', 'Taksitli Ödeme'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Perpa Ticaret Merkezi, A Blok Kat:9 No:1288',
      addressLocality: 'Şişli',
      addressRegion: 'İstanbul',
      postalCode: '34384',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.0603,
      longitude: 28.9847,
    },
    hasMap: 'https://maps.app.goo.gl/MDr3VLmZyjXjFTvy8',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '17:00',
      },
    ],
    // Teknik destek 7/24
    specialOpeningHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
      description: '7/24 Teknik Destek Hattı',
    },
    areaServed: [
      { '@type': 'City', name: 'İstanbul' },
      { '@type': 'AdministrativeArea', name: 'Şişli' },
      { '@type': 'AdministrativeArea', name: 'Mecidiyeköy' },
      { '@type': 'AdministrativeArea', name: 'Beyoğlu' },
      { '@type': 'AdministrativeArea', name: 'Beşiktaş' },
      { '@type': 'AdministrativeArea', name: 'Kağıthane' },
      { '@type': 'AdministrativeArea', name: 'Sarıyer' },
      { '@type': 'AdministrativeArea', name: 'Bakırköy' },
      { '@type': 'AdministrativeArea', name: 'Kadıköy' },
      { '@type': 'AdministrativeArea', name: 'Ataşehir' },
      { '@type': 'AdministrativeArea', name: 'Ümraniye' },
    ],
    // Sunulan hizmetler
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Güvenlik Kamerası Kurulumu',
          description: 'Profesyonel CCTV ve IP kamera sistemleri kurulumu',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Yangın Alarm Sistemi Kurulumu',
          description: 'Konvansiyonel ve adresli yangın algılama sistemleri',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Hırsız Alarm Sistemi Kurulumu',
          description: 'Ev ve işyeri için kablosuz ve kablolu alarm sistemleri',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Bariyer Sistemi Kurulumu',
          description: 'Otopark ve site girişleri için otomatik bariyer sistemleri',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Turnike Sistemi Kurulumu',
          description: 'Personel ve ziyaretçi geçiş kontrolü için turnike sistemleri',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Geçiş Kontrol Sistemi Kurulumu',
          description: 'Kartlı geçiş, parmak izi ve yüz tanıma sistemleri',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'GSM Sinyal Güçlendirici Kurulumu',
          description: 'Bina içi zayıf GSM sinyalini güçlendiren 4G/5G repeater sistemleri',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Plaka Tanıma Sistemi Kurulumu',
          description: 'ANPR/LPR teknolojisi ile araç plaka tanıma ve otopark yönetim sistemleri',
        },
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '250',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'Mehmet K.',
        },
        datePublished: '2025-11-15',
        reviewBody: 'Ofisimize güvenlik kamerası kurdular. Çok profesyonel bir ekip, kesinlikle tavsiye ederim.',
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'Ayşe T.',
        },
        datePublished: '2025-10-22',
        reviewBody: 'Fabrikamızın yangın alarm sistemini yenilediler. Hızlı ve güvenilir hizmet.',
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'Ali R.',
        },
        datePublished: '2025-09-10',
        reviewBody: 'Sitemize turnike ve bariyer sistemi kurdular. Artık giriş çıkışlar çok daha kontrollü.',
      },
    ],
    sameAs: [
      'https://www.facebook.com/mattech',
      'https://www.instagram.com/mattech',
      'https://twitter.com/mattech',
      'https://www.youtube.com/mattech',
      'https://www.linkedin.com/company/mattech',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
