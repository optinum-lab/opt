/**
 * İptal ve İade Koşulları Sayfası
 */

import { Container } from "@/components/ui";

export default function IptalIadePage() {
  return (
    <main className="min-h-screen bg-background pt-24 md:pt-28 lg:pt-32 pb-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            İptal ve İade Koşulları
          </h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-foreground-secondary mb-8">
              Son Güncelleme: 13 Ocak 2026
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Genel Bilgiler</h2>
              <p className="text-foreground-secondary leading-relaxed">
                6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler 
                Yönetmeliği uyarınca, Mat Tech'ten satın aldığınız ürünleri belirli 
                koşullar altında iade edebilir veya siparişinizi iptal edebilirsiniz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Cayma Hakkı Süresi</h2>
              <div className="text-foreground-secondary leading-relaxed space-y-3">
                <p>
                  Ürünün size teslim edildiği tarihten itibaren 14 (ondört) gün içinde 
                  herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin sözleşmeden 
                  cayma hakkınız bulunmaktadır.
                </p>
                <p className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500">
                  <strong className="text-foreground">ÖNEMLİ:</strong> Cayma hakkı süresinin 
                  son günü resmi tatile denk gelirse, süre tatili takip eden ilk iş gününün 
                  mesai saati sonuna kadar uzar.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Cayma Hakkı Nasıl Kullanılır?</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Cayma hakkınızı kullanmak için aşağıdaki yöntemlerden birini kullanabilirsiniz:
              </p>
              <ul className="list-disc list-inside text-foreground-secondary space-y-2 ml-4">
                <li><strong className="text-foreground">E-posta:</strong> info@mattech.com.tr adresine cayma bildirimi gönderin</li>
                <li><strong className="text-foreground">Telefon:</strong> +90 545 450 65 87 numarasını arayarak bildirin</li>
                <li><strong className="text-foreground">Yazılı Bildirim:</strong> Perpa Ticaret Merkezi, A Blok Kat:9 No:1288, Şişli/İstanbul adresine posta ile gönderin</li>
              </ul>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
                <p className="text-foreground-secondary">
                  Bildiriminizde şu bilgiler yer almalıdır: Ad-Soyad, sipariş numarası, 
                  iade edilecek ürün bilgisi, iade nedeni (isteğe bağlı), iban bilgisi.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. İade Edilecek Ürünün Durumu</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                İade edilen ürünler aşağıdaki koşulları sağlamalıdır:
              </p>
              <ul className="list-disc list-inside text-foreground-secondary space-y-2 ml-4">
                <li>Ürün kullanılmamış ve hasar görmemiş olmalıdır</li>
                <li>Orijinal ambalajı ile birlikte iade edilmelidir</li>
                <li>Ürünle birlikte gelen tüm aksesuarlar, kablolar, kılavuzlar eksiksiz olmalıdır</li>
                <li>Fatura veya fatura yerine geçen belge iade ile birlikte gönderilmelidir</li>
                <li>Ürün üzerinde kurulum yapılmamış olmalıdır</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. İade İşlemi Adımları</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Cayma Bildiriminde Bulunun</h3>
                    <p className="text-foreground-secondary">E-posta, telefon veya yazılı olarak cayma hakkınızı kullandığınızı bildirin.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Ürünü Paketleyin</h3>
                    <p className="text-foreground-secondary">Ürünü orijinal ambalajı ve tüm aksesuarları ile birlikte özenle paketleyin.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Kargo ile Gönderin</h3>
                    <p className="text-foreground-secondary">Ürünü cayma bildirimine 10 gün içinde kargo ile adresimize gönderin.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">İade Alın</h3>
                    <p className="text-foreground-secondary">Ürün kontrolünden sonra 14 gün içinde ödemeniz iade edilir.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Kargo Masrafları</h2>
              <div className="text-foreground-secondary leading-relaxed space-y-3">
                <p>
                  <strong className="text-foreground">Cayma Hakkı Kullanımı:</strong> İade kargo 
                  masrafı müşteriye aittir. Ürünü herhangi bir kargo şirketi ile 
                  gönderebilirsiniz.
                </p>
                <p>
                  <strong className="text-foreground">Hasarlı/Hatalı Ürün:</strong> Ürün hasarlı 
                  veya hatalı geldi ise, kargo masrafları tarafımızdan karşılanır. Bu durumda 
                  önce bizimle iletişime geçiniz.
                </p>
                <p className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  Kargo ile gönderilecek ürünler için kargo takip numarasını mutlaka 
                  bizimle paylaşınız.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. İade Süresi ve Ödeme</h2>
              <div className="text-foreground-secondary leading-relaxed space-y-3">
                <p>
                  İade ettiğiniz ürün tarafımıza ulaştıktan sonra kontrolleri yapılır. 
                  Ürünün iade koşullarına uygun olması halinde, cayma bildirimine 14 gün 
                  içinde ödeme iade işlemi gerçekleştirilir.
                </p>
                <p><strong className="text-foreground">İade Yöntemleri:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Kredi kartına iade (2-8 iş günü)</li>
                  <li>Banka hesabına havale (bildirdiğiniz IBAN'a)</li>
                  <li>Orijinal ödeme yönteminize geri ödeme</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Cayma Hakkı Kullanılamayacak Ürünler</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Aşağıdaki durumlarda cayma hakkı kullanılamaz:
              </p>
              <ul className="list-disc list-inside text-foreground-secondary space-y-2 ml-4">
                <li>Müşterinin istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan ürünler</li>
                <li>Kurulumu yapılmış ve kullanıma alınmış sistemler</li>
                <li>Ambalajı açılmış yazılım ve lisans ürünleri</li>
                <li>Niteliği itibarıyla iade edilemeyecek ürünler</li>
                <li>Özel sipariş üzerine üretilen veya konfigüre edilen ürünler</li>
                <li>Hızla bozulabilen veya son kullanma tarihi geçebilecek ürünler</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Hasarlı/Hatalı Ürün Teslimatı</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Ürün size hasarlı veya hatalı ulaştıysa:
              </p>
              <ul className="list-disc list-inside text-foreground-secondary space-y-2 ml-4">
                <li>Kargo görevlisinin huzurunda ürünü kontrol edin</li>
                <li>Hasarlıysa tutanak tutturun ve fotoğraflayın</li>
                <li>Ürünü kabul etmeyin veya "hasarlı teslim alındı" şerhi düşürün</li>
                <li>Derhal bizimle iletişime geçin: +90 545 450 65 87</li>
                <li>Ürün değişimi veya onarımı için süreç başlatılır</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Sipariş İptali</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Ürün kargoya verilmeden önce siparişinizi iptal edebilirsiniz. Ödeme yaptıysanız, 
                ödeme tutarı 3-5 iş günü içinde tarafınıza iade edilir. İptal için +90 545 450 65 87 
                numaralı telefonu arayabilir veya info@mattech.com.tr adresine e-posta 
                gönderebilirsiniz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Müşteri Hizmetleri</h2>
              <div className="text-foreground-secondary leading-relaxed space-y-2">
                <p>İade ve iptal işlemleri ile ilgili detaylı bilgi için:</p>
                <p><strong className="text-foreground">E-posta:</strong> info@mattech.com.tr</p>
                <p><strong className="text-foreground">Telefon:</strong> +90 545 450 65 87</p>
                <p><strong className="text-foreground">Adres:</strong> Perpa Ticaret Merkezi, A Blok Kat:9 No:1288, Şişli/İstanbul</p>
                <p><strong className="text-foreground">Çalışma Saatleri:</strong> Hafta içi 09:00 - 18:00</p>
              </div>
            </section>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mt-8">
              <h3 className="text-lg font-semibold text-foreground mb-3">Önemli Hatırlatmalar</h3>
              <ul className="list-disc list-inside text-foreground-secondary space-y-2">
                <li>İade kargo takip numaranızı mutlaka saklayın</li>
                <li>İade edilecek ürünleri sigortalı kargo ile gönderin</li>
                <li>Fatura ve tüm belgelerin kopyasını ürün ile gönderin</li>
                <li>Ürün ambalajına zarar vermeden açın</li>
                <li>İade sürecini takip etmek için sipariş numaranızı hazır bulundurun</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
