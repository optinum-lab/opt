/**
 * Organization Schema Component
 * JSON-LD structured data for Mat Tech company
 * Güvenlik sektörü odaklı SEO optimizasyonu
 */

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.mattech.com.tr/#organization',
    name: 'Mat Tech',
    legalName: 'Mat Tech Güvenlik Sistemleri',
    alternateName: ['Mat Tech Güvenlik', 'MatTech', 'Mat Tech Security'],
    url: 'https://www.mattech.com.tr',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.mattech.com.tr/logo.png',
      width: 300,
      height: 60,
    },
    image: 'https://www.mattech.com.tr/og-image.png',
    description:
      'İstanbul Perpa\'da 10+ yıllık tecrübe ile güvenlik kamerası, yangın alarm sistemi, hırsız alarmı, bariyer, turnike ve geçiş kontrol sistemleri kurulumu. Dahua ve Hikvision yetkili bayisi.',
    slogan: 'Güvenliğiniz Bizim İşimiz',
    telephone: '+90-545-450-6587',
    email: 'info@mattech.com.tr',
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
    areaServed: [
      {
        '@type': 'City',
        name: 'İstanbul',
        '@id': 'https://www.wikidata.org/wiki/Q406',
      },
      {
        '@type': 'Country',
        name: 'Türkiye',
      },
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 41.0603,
        longitude: 28.9847,
      },
      geoRadius: '100000',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+90-545-450-6587',
        contactType: 'customer service',
        areaServed: 'TR',
        availableLanguage: ['Turkish', 'English'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
      },
      {
        '@type': 'ContactPoint',
        telephone: '+90-545-450-6587',
        contactType: 'sales',
        areaServed: 'TR',
        availableLanguage: ['Turkish'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+90-545-450-6587',
        contactType: 'technical support',
        areaServed: 'TR',
        availableLanguage: ['Turkish'],
      },
    ],
    sameAs: [
      'https://www.facebook.com/mattech',
      'https://www.instagram.com/mattech',
      'https://twitter.com/mattech',
      'https://www.youtube.com/mattech',
      'https://www.linkedin.com/company/mattech',
      'https://www.tiktok.com/@mattech',
    ],
    // Sunulan hizmetler
    knowsAbout: [
      'Güvenlik Kamerası Sistemleri',
      'CCTV Kurulumu',
      'IP Kamera',
      'Yangın Alarm Sistemleri',
      'Hırsız Alarm Sistemleri',
      'Bariyer Sistemleri',
      'Turnike Sistemleri',
      'Geçiş Kontrol Sistemleri',
      'Access Kontrol',
      'Görüntülü İnterkom',
      'GSM Sinyal Güçlendirici',
      'Cep Telefonu Sinyal Amplifikatörü',
      'Plaka Tanıma Sistemleri',
      'ANPR/LPR Sistemleri',
      'Dahua Ürünleri',
      'Hikvision Ürünleri',
    ],
    // Yetkili bayilikler
    brand: [
      {
        '@type': 'Brand',
        name: 'Dahua',
      },
      {
        '@type': 'Brand',
        name: 'Hikvision',
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
        },
        author: {
          '@type': 'Person',
          name: 'Ahmet Y.',
        },
        reviewBody: 'Profesyonel ekip, kaliteli ürünler. Kamera sistemimizi kurdular, çok memnunuz.',
      },
    ],
    priceRange: '₺₺',
    foundingDate: '2014',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 10,
      maxValue: 50,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Güvenlik Sistemleri Kataloğu',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Güvenlik Kameraları',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'IP Kamera Kurulumu' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CCTV Sistemi Kurulumu' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'DVR/NVR Kurulumu' } },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Alarm Sistemleri',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Yangın Alarm Kurulumu' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hırsız Alarm Kurulumu' } },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Geçiş Kontrol',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Turnike Sistemi Kurulumu' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bariyer Sistemi Kurulumu' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kartlı Geçiş Sistemi' } },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'GSM Sinyal Güçlendirici',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'GSM Repeater Kurulumu' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '4G/5G Sinyal Güçlendirici' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bina İçi Sinyal Çözümleri' } },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Plaka Tanıma Sistemleri',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ANPR/LPR Kamera Kurulumu' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Otopark Plaka Tanıma' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bariyer Entegrasyonu' } },
          ],
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
