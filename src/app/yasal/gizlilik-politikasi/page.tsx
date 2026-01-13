/**
 * Gizlilik Politikası Sayfası
 */

import { Container } from "@/components/ui";

export default function GizlilikPolitikasiPage() {
  return (
    <main className="min-h-screen bg-background pt-24 md:pt-28 lg:pt-32 pb-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Gizlilik Politikası
          </h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-foreground-secondary mb-8">
              Son Güncelleme: 13 Ocak 2026
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Genel Bilgiler</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Mat Tech olarak, müşterilerimizin ve web sitemizi ziyaret edenlerin
                gizliliğini korumayı taahhüt ediyoruz. Bu Gizlilik Politikası, kişisel bilgilerinizin 
                nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Toplanan Bilgiler</h2>
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">2.1. Otomatik Olarak Toplanan Bilgiler</h3>
              <ul className="list-disc list-inside text-foreground-secondary space-y-2 ml-4">
                <li>IP adresi</li>
                <li>Tarayıcı türü ve versiyonu</li>
                <li>İşletim sistemi</li>
                <li>Ziyaret edilen sayfalar ve harcanan süre</li>
                <li>Yönlendirme yapan web sitesi</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">2.2. Sizin Tarafınızdan Sağlanan Bilgiler</h3>
              <ul className="list-disc list-inside text-foreground-secondary space-y-2 ml-4">
                <li>Ad ve soyad</li>
                <li>E-posta adresi</li>
                <li>Telefon numarası</li>
                <li>Adres bilgileri</li>
                <li>İletişim formları aracılığıyla paylaşılan diğer bilgiler</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Bilgilerin Kullanım Amaçları</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Topladığımız bilgileri aşağıdaki amaçlarla kullanmaktayız:
              </p>
              <ul className="list-disc list-inside text-foreground-secondary space-y-2 ml-4">
                <li>Hizmetlerimizi sunmak ve geliştirmek</li>
                <li>Müşteri taleplerini yanıtlamak</li>
                <li>Teknik destek sağlamak</li>
                <li>Güvenlik kamerası sistemlerinin kurulumu ve bakımını yapmak</li>
                <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                <li>Web sitemizi iyileştirmek ve kullanıcı deneyimini optimize etmek</li>
                <li>Size hizmetlerimiz hakkında bilgi vermek (izniniz dahilinde)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Çerezler (Cookies)</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Web sitemiz, kullanıcı deneyimini iyileştirmek ve site trafiğini analiz etmek için 
                çerezler kullanmaktadır. Çerezler hakkında detaylı bilgi için 
                <a href="/yasal/cerez-politikasi" className="text-red-500 hover:text-red-600"> Çerez Politikamızı </a>
                inceleyebilirsiniz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Bilgi Güvenliği</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Kişisel bilgilerinizi korumak için endüstri standardı güvenlik önlemleri kullanıyoruz. 
                Buna SSL şifrelemesi, güvenli sunucular ve düzenli güvenlik denetimleri dahildir. 
                Ancak, internet üzerinden yapılan hiçbir veri iletiminin %100 güvenli olduğu 
                garanti edilemez.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Üçüncü Taraf Paylaşımları</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Kişisel bilgilerinizi, aşağıdaki durumlar dışında üçüncü taraflarla paylaşmıyoruz:
              </p>
              <ul className="list-disc list-inside text-foreground-secondary space-y-2 ml-4">
                <li>Yasal zorunluluklar</li>
                <li>Hizmet sağlayıcılar (kurulum, bakım vb.)</li>
                <li>Açık rızanızın bulunması</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Haklarınız</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Kişisel bilgilerinizle ilgili olarak aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="list-disc list-inside text-foreground-secondary space-y-2 ml-4">
                <li>Bilgilerinize erişim talep etme</li>
                <li>Bilgilerinizin düzeltilmesini isteme</li>
                <li>Bilgilerinizin silinmesini talep etme</li>
                <li>Pazarlama iletişimlerinden çıkma</li>
                <li>Veri taşınabilirliği hakkı</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Çocukların Gizliliği</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Hizmetlerimiz 18 yaşın altındaki kişilere yönelik değildir. Bilerek 18 yaşın 
                altındaki kişilerden kişisel bilgi toplamıyoruz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Politika Değişiklikleri</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Değişiklikler bu sayfada 
                yayınlanacak ve önemli değişiklikler için size bildirimde bulunulacaktır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. İletişim</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Gizlilik Politikamız hakkında sorularınız varsa bizimle iletişime geçebilirsiniz:
              </p>
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
