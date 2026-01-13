/**
 * Website Schema Component
 * JSON-LD structured data for website
 */

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.mattech.com.tr/#website',
    url: 'https://www.mattech.com.tr',
    name: 'Mat Tech',
    alternateName: [
      'mattech',
      'mat tech',
      'MatTech',
      'MATTECH',
      'MAT TECH',
      'mattech.com.tr',
    ],
    description:
      'mattech - mat tech - İstanbul Perpa\'da profesyonel güvenlik kamera sistemleri, alarm, bariyer ve geçiş kontrol çözümleri. Dahua ve Hikvision yetkili bayisi.',
    publisher: {
      '@id': 'https://www.mattech.com.tr/#organization',
    },
    inLanguage: 'tr-TR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.mattech.com.tr/urunler?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
