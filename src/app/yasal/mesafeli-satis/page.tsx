/**
 * Mesafeli Satış Sözleşmesi Sayfası
 */

import { Container } from "@/components/ui";

export default function MesafeliSatisSozlesmesiPage() {
  return (
    <main className="min-h-screen bg-background pt-24 md:pt-28 lg:pt-32 pb-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Mesafeli Satış Sözleşmesi
          </h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-foreground-secondary mb-8">
              Son Güncelleme: 13 Ocak 2026
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Taraflar</h2>
              <div className="text-foreground-secondary leading-relaxed space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">SATICI BİLGİLERİ</h3>
                  <p><strong>Ünvan:</strong> Mat Tech Güvenlik Teknolojileri</p>
                  <p><strong>Adres:</strong> Perpa Ticaret Merkezi, A Blok Kat:9 No:1288, Şişli/İstanbul</p>
                  <p><strong>Telefon:</strong> +90 545 450 65 87</p>
                  <p><strong>E-posta:</strong> info@mattech.com.tr</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">ALICI BİLGİLERİ</h3>
                  <p>Siparişi veren kişi/kurum bilgileri sipariş formunda belirtilir.</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Sözleşmenin Konusu</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Bu sözleşme, SATICI'nın, ALICI'ya satışını yaptığı aşağıda nitelikleri ve 
                satış fiyatı belirtilen ürün/ürünlerin satışı ve teslimi ile ilgili olarak 
                6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler 
                Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerini düzenler.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Sözleşme Konusu Ürün/Hizmet Bilgileri</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Satışa konu ürünün/hizmetin temel özellikleri, satış fiyatı, ödeme şekli ve 
                teslimat bilgileri web sitesinde yer almaktadır. Ürün özelliklerine sipariş 
                sırasında erişebilir ve sipariş özetinde görebilirsiniz.
              </p>
              <ul className="list-disc list-inside text-foreground-secondary space-y-2 ml-4">
                <li>Ürün adı, modeli, cinsi, miktarı</li>
                <li>KDV dahil satış fiyatı</li>
                <li>Ödeme şekli</li>
                <li>Teslimat bilgileri</li>
                <li>Kurulum hizmetleri (varsa)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Genel Hükümler</h2>
              <div className="text-foreground-secondary leading-relaxed space-y-3">
                <p>
                  ALICI, web sitesinde sözleşme konusu ürünün temel nitelikleri, satış fiyatı, 
                  ödeme şekli ve teslimat koşulları hakkında ön bilgileri okuyup bilgi sahibi 
                  olduğunu ve elektronik ortamda onay verdiğini beyan eder.
                </p>
                <p>
                  Sözleşme konusu ürün, yasal süreyi aşmamak koşulu ile her bir ürün için 
                  ALICI'nın yerleşim yerinin uzaklığına bağlı olarak 30 günlük süre içinde 
                  ALICI veya gösterdiği adresteki kişi/kuruluşa teslim edilir.
                </p>
                <p>
                  Ürünün tesliminden sonra ALICI'ya ait kredi kartının yetkisiz kişilerce 
                  haksız kullanılması sonucunda ürün bedeli ödenmediği takdirde, ALICI 
                  kendisine teslim edilmiş olan ürünü 3 gün içinde SATICI'ya iade etmek zorundadır.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Cayma Hakkı</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                ALICI, sözleşme konusu ürünün teslimine ilişkin olarak 14 (ondört) gün içinde 
                cayma hakkına sahiptir. Cayma hakkı süresi, ürünün teslim edildiği günden itibaren başlar.
              </p>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                <strong className="text-foreground">Cayma Hakkı Kullanılamayacak Ürünler:</strong>
              </p>
              <ul className="list-disc list-inside text-foreground-secondary space-y-2 ml-4">
                <li>ALICI'nın istekleri veya açıkça kişisel ihtiyaçları doğrultusunda hazırlanan mallar</li>
                <li>Kurulumu yapılmış ve kullanılmış sistemler</li>
                <li>Ambalajı açılmış yazılım ve lisans ürünleri</li>
                <li>Özel konfigürasyonla hazırlanmış ürünler</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Cayma Hakkının Kullanılması</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Cayma hakkını kullanmak isteyen ALICI, bu durumu 14 günlük süre içinde 
                SATICI'ya yazılı olarak veya elektronik posta ile bildirmelidir.
              </p>
              <p className="text-foreground-secondary leading-relaxed">
                Cayma hakkının kullanılması halinde, ürün bedeli ve varsa teslimat masrafları 
                14 gün içinde ALICI'ya iade edilir. Ürünün ALICI tarafından SATICI'ya gönderim 
                masrafı ALICI'ya aittir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Ödeme ve Teslimat</h2>
              <div className="text-foreground-secondary leading-relaxed space-y-3">
                <p><strong className="text-foreground">Ödeme Şekilleri:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Kredi kartı (tek çekim veya taksitli)</li>
                  <li>Banka havalesi/EFT</li>
                  <li>Kapıda ödeme (belirli ürünler için)</li>
                </ul>
                <p className="mt-4"><strong className="text-foreground">Teslimat:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Ürünler, sipariş onayından sonra en geç 30 gün içinde teslim edilir</li>
                  <li>Teslimat masrafları ürün fiyatına dahil değilse ayrıca belirtilir</li>
                  <li>Kurulum hizmeti varsa, teslimat sonrası randevu ile gerçekleştirilir</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Mücbir Sebepler</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Doğal afet, yangın, hükümet kararı, salgın hastalık, altyapı ve internet 
                arızaları, elektrik kesintisi gibi öngörülemeyen ve önlenemeyen durumlarda 
                SATICI, sözleşme konusu edimlerini geç veya eksik ifa etme veya ifa etmeme 
                nedeniyle sorumlu değildir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Yetkili Mahkeme</h2>
              <p className="text-foreground-secondary leading-relaxed">
                İşbu sözleşmenin uygulanmasında, Gümrük ve Ticaret Bakanlığınca her yıl 
                belirlenen değere kadar Tüketici Hakem Heyetleri ile ALICI'nın veya SATICI'nın 
                yerleşim yerindeki Tüketici Mahkemeleri yetkilidir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Yürürlük</h2>
              <p className="text-foreground-secondary leading-relaxed">
                ALICI, siparişi onayladığında işbu sözleşmenin tüm koşullarını kabul etmiş 
                sayılır. Sözleşme, ALICI'nın siparişi onayladığı tarihte yürürlüğe girer.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. İletişim</h2>
              <div className="text-foreground-secondary leading-relaxed space-y-2">
                <p>Mesafeli satış sözleşmesi ile ilgili sorularınız için:</p>
                <p><strong className="text-foreground">E-posta:</strong> info@mattech.com.tr</p>
                <p><strong className="text-foreground">Telefon:</strong> +90 545 450 65 87</p>
                <p><strong className="text-foreground">Adres:</strong> Perpa Ticaret Merkezi, A Blok Kat:9 No:1288, Şişli/İstanbul</p>
              </div>
            </section>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mt-8">
              <p className="text-foreground-secondary leading-relaxed">
                <strong className="text-foreground">NOT:</strong> Bu sözleşme, sipariş 
                onaylandığında elektronik ortamda akdedilmiş olup, ürün teslim alınırken 
                bir nüshası da fiziki olarak teslim edilecektir.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
