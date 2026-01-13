/**
 * KVKK (Kişisel Verilerin Korunması) Sayfası
 */

import { Container } from "@/components/ui";

export default function KVKKPage() {
  return (
    <main className="min-h-screen bg-background pt-24 md:pt-28 lg:pt-32 pb-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Kişisel Verilerin Korunması ve İşlenmesi Politikası (KVKK)
          </h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-foreground-secondary mb-8">
              Son Güncelleme: 13 Ocak 2026
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Veri Sorumlusu</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Mat Tech olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK")
                uyarınca veri sorumlusu sıfatıyla, kişisel verilerinizi aşağıda açıklanan kapsamda 
                işlemekteyiz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. İşlenen Kişisel Veriler</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Güvenlik kamerası sistemleri kurulumu ve hizmet sürecinde aşağıdaki kişisel verileriniz işlenmektedir:
              </p>
              <ul className="list-disc list-inside text-foreground-secondary space-y-2 ml-4">
                <li>Kimlik Bilgileri (Ad, soyad, TC kimlik numarası)</li>
                <li>İletişim Bilgileri (Telefon, e-posta, adres)</li>
                <li>Müşteri İşlem Bilgileri (Sipariş, fatura, ödeme bilgileri)</li>
                <li>Görsel ve İşitsel Kayıtlar (Güvenlik kamerası görüntüleri)</li>
                <li>Teknik Veriler (IP adresi, çerez bilgileri)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Kişisel Verilerin İşlenme Amaçları</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
              </p>
              <ul className="list-disc list-inside text-foreground-secondary space-y-2 ml-4">
                <li>Güvenlik kamerası sistemlerinin kurulumu ve bakımının yapılması</li>
                <li>Müşteri hizmetlerinin sunulması ve iyileştirilmesi</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                <li>Güvenlik tedbirlerinin uygulanması</li>
                <li>Ticari faaliyetlerin yürütülmesi</li>
                <li>İletişim ve bilgilendirme faaliyetlerinin gerçekleştirilmesi</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Kişisel Verilerin Aktarılması</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda, 
                yurt içindeki iş ortaklarımıza, tedarikçilerimize, kanunen yetkili kamu kurum ve 
                kuruluşlarına KVKK'nın öngördüğü şartlara uygun olarak aktarılabilmektedir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Kişisel verileriniz, elektronik ve fiziksel ortamlarda, KVKK'nın 5. ve 6. maddelerinde 
                belirtilen hukuki sebeplere dayanarak toplanmaktadır:
              </p>
              <ul className="list-disc list-inside text-foreground-secondary space-y-2 ml-4">
                <li>Açık rızanızın bulunması</li>
                <li>Sözleşmenin kurulması veya ifası için gerekli olması</li>
                <li>Yasal yükümlülüğün yerine getirilmesi</li>
                <li>Meşru menfaatlerimiz için veri işlemenin zorunlu olması</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Kişisel Veri Sahibinin Hakları</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                KVKK'nın 11. maddesi uyarınca, kişisel veri sahipleri olarak aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="list-disc list-inside text-foreground-secondary space-y-2 ml-4">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme</li>
                <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
                <li>KVKK'da öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
                <li>Düzeltme, silme veya yok etme taleplerinin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
                <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
                <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Güvenlik Kamerası Kayıtları</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Kurduğumuz güvenlik kamerası sistemleri ile elde edilen görüntüler, can ve mal güvenliğinin 
                sağlanması amacıyla işlenmekte ve yasal saklama süresi boyunca muhafaza edilmektedir. 
                Bu veriler, yalnızca yetkili personel tarafından erişilebilir ve yasal zorunluluklar 
                haricinde üçüncü kişilerle paylaşılmamaktadır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Başvuru Yöntemi</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Yukarıda belirtilen haklarınızı kullanmak için, kimliğinizi tespit edici gerekli 
                bilgiler ile birlikte info@optinumguvenlik.com adresine e-posta veya Perpa Ticaret 
                Merkezi, A Blok Kat:9 No:1288, Şişli/İstanbul adresine yazılı olarak başvurabilirsiniz. 
                Başvurularınız, KVKK'nın 13. maddesi uyarınca en geç 30 gün içinde sonuçlandırılacaktır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. İletişim</h2>
              <div className="text-foreground-secondary leading-relaxed space-y-2">
                <p><strong className="text-foreground">Adres:</strong> Perpa Ticaret Merkezi, A Blok Kat:9 No:1288, Şişli/İstanbul</p>
                <p><strong className="text-foreground">E-posta:</strong> info@optinumguvenlik.com</p>
                <p><strong className="text-foreground">Telefon:</strong> +90 545 450 65 87</p>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
