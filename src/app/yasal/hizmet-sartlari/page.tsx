/**
 * Hizmet Şartları Sayfası
 */

import { Container } from "@/components/ui";

export default function HizmetSartlariPage() {
  return (
    <main className="min-h-screen bg-background pt-24 md:pt-28 lg:pt-32 pb-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Hizmet Şartları ve Kullanım Koşulları
          </h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-foreground-secondary mb-8">
              Son Güncelleme: 13 Ocak 2026
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Hizmetlerimiz</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Mat Tech, güvenlik kamerası sistemlerinin satışı, kurulumu, bakımı ve 
                teknik desteği konusunda hizmet vermektedir. Bu şartlar, hizmetlerimizi kullanırken 
                sizinle aramızdaki ilişkiyi düzenler.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Hizmet Kapsamı</h2>
              <ul className="list-disc list-inside text-foreground-secondary space-y-2 ml-4">
                <li>Güvenlik kamerası sistemleri danışmanlığı ve proje tasarımı</li>
                <li>Ürün tedariki ve kurulum hizmetleri</li>
                <li>Periyodik bakım ve onarım hizmetleri</li>
                <li>7/24 teknik destek</li>
                <li>Sistem yükseltme ve iyileştirme hizmetleri</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Müşteri Sorumlulukları</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Müşteri olarak aşağıdaki sorumluluklara sahipsiniz:
              </p>
              <ul className="list-disc list-inside text-foreground-secondary space-y-2 ml-4">
                <li>Doğru ve eksiksiz bilgi sağlamak</li>
                <li>Kurulum için uygun ortam ve altyapı hazırlamak</li>
                <li>Yasal düzenlemelere uygun kullanım sağlamak</li>
                <li>Ödeme yükümlülüklerini zamanında yerine getirmek</li>
                <li>Sistemlerin yetkisiz müdahalelerden korunmasını sağlamak</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Fiyatlandırma ve Ödeme</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Hizmet bedellerimiz, sunulan hizmetin kapsamına göre belirlenir. Tüm fiyatlar 
                KDV dahildir. Ödeme koşulları sözleşmede belirtilir ve müşterinin kabul ettiği 
                şekilde uygulanır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Garanti ve Teknik Destek</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Kurulum yaptığımız tüm sistemler için garanti süresi içerisinde ücretsiz teknik 
                destek sağlanır. Garanti kapsamı:
              </p>
              <ul className="list-disc list-inside text-foreground-secondary space-y-2 ml-4">
                <li>Ürün garantisi: Üretici garantisi geçerlidir</li>
                <li>Kurulum garantisi: 2 yıl</li>
                <li>Ücretsiz teknik destek: 7/24</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Sorumluluk Sınırları</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Mat Tech, hizmetlerini özen ve dikkatle sunmayı taahhüt eder. Ancak, 
                doğal afetler, elektrik kesintileri, internet bağlantı sorunları gibi kontrolümüz 
                dışındaki durumlardan sorumlu tutulamaz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Gizlilik ve Veri Koruma</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Kamera kayıtları ve kişisel verilerinizin korunması konusunda KVKK ve ilgili 
                yasal düzenlemelere tam uyum sağlıyoruz. Detaylı bilgi için 
                <a href="/yasal/kvkk" className="text-red-500 hover:text-red-600"> KVKK Politikamızı </a>
                inceleyebilirsiniz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Sözleşmenin Sona Ermesi</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Taraflardan biri, sözleşme şartlarının ihlali durumunda yazılı bildirimle 
                sözleşmeyi sonlandırabilir. Sözleşme sona erdiğinde, tahakkuk etmiş tüm 
                ödemeler yapılmalıdır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Uyuşmazlık Çözümü</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Bu şartlardan kaynaklanan uyuşmazlıkların çözümünde İstanbul Mahkemeleri ve 
                İcra Daireleri yetkilidir. Öncelikle dostane çözüm yolları denenir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Değişiklikler</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Mat Tech, bu hizmet şartlarını önceden bildirimde bulunarak değiştirme 
                hakkını saklı tutar. Güncel şartlar her zaman web sitemizde yayınlanır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. İletişim</h2>
              <div className="text-foreground-secondary leading-relaxed space-y-2">
                <p><strong className="text-foreground">E-posta:</strong> info@mattech.com.tr</p>
                <p><strong className="text-foreground">Telefon:</strong> +90 545 450 65 87</p>
                <p><strong className="text-foreground">Adres:</strong> Perpa Ticaret Merkezi, A Blok Kat:9 No:1288, Şişli/İstanbul</p>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
