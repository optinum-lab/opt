/**
 * Organization Schema Component
 * JSON-LD structured data for Mat Tech company
 */

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.mattech.com.tr/#organization',
    name: 'Mat Tech',
    legalName: 'Mat Tech Güvenlik Teknolojileri',
    url: 'https://www.mattech.com.tr',
    logo: 'https://www.mattech.com.tr/logo.png',
    image: 'https://www.mattech.com.tr/og-image.png',
    description:
      'Profesyonel güvenlik kamera sistemleri ve CCTV çözümleri. Dahua ve Hikvision ürünleri ile ev ve işyeri güvenliği.',
    telephone: '+90-545-450-6587',
    email: 'info@mattech.com.tr',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Perpa Ticaret Merkezi, A Blok Kat:9 No:1288',
      addressLocality: 'Şişli',
      addressRegion: 'İstanbul',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '41.0603',
      longitude: '28.9847',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Türkiye',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90-545-450-6587',
      contactType: 'customer service',
      areaServed: 'TR',
      availableLanguage: ['Turkish'],
      contactOption: 'TollFree',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    },
    sameAs: [
      'https://www.facebook.com/mattech',
      'https://www.instagram.com/mattech',
      'https://twitter.com/mattech',
      'https://www.youtube.com/mattech',
      'https://www.linkedin.com/company/mattech',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
    priceRange: '$$',
    foundingDate: '2014',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: '10-50',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
