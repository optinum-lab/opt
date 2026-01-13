/**
 * Çerez Politikası Sayfası
 */

import { Container } from "@/components/ui";

export default function CerezPolitikasiPage() {
  return (
    <main className="min-h-screen bg-background pt-24 md:pt-28 lg:pt-32 pb-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Çerez Politikası
          </h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-foreground-secondary mb-8">
              Son Güncelleme: 13 Ocak 2026
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Çerez Nedir?</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Çerezler, ziyaret ettiğiniz internet siteleri tarafından tarayıcınız aracılığıyla 
                cihazınıza yerleştirilen küçük metin dosyalarıdır. Bu dosyalar, web sitesinin 
                daha verimli çalışmasını sağlar ve site sahiplerine bilgi verir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Çerez Kullanım Amacımız</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Mat Tech olarak, web sitemizde çerezleri aşağıdaki amaçlarla kullanıyoruz:
              </p>
              <ul className="list-disc list-inside text-foreground-secondary space-y-2 ml-4">
                <li>Web sitesinin düzgün çalışmasını sağlamak</li>
                <li>Kullanıcı deneyimini iyileştirmek</li>
                <li>Site performansını analiz etmek</li>
                <li>Tercihlerinizi hatırlamak (tema, dil vb.)</li>
                <li>Güvenlik önlemlerini uygulamak</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Kullandığımız Çerez Türleri</h2>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">3.1 Zorunlu Çerezler</h3>
                <p className="text-foreground-secondary leading-relaxed">
                  Web sitesinin temel işlevlerini yerine getirmesi için gerekli olan çerezlerdir. 
                  Bu çerezler olmadan site düzgün çalışamaz.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">3.2 Performans Çerezleri</h3>
                <p className="text-foreground-secondary leading-relaxed">
                  Ziyaretçilerin siteyi nasıl kullandığını anlamamıza yardımcı olan çerezlerdir. 
                  Hangi sayfaların en çok ziyaret edildiği ve hata mesajları gibi bilgileri toplar.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">3.3 İşlevsel Çerezler</h3>
                <p className="text-foreground-secondary leading-relaxed">
                  Tercihlerinizi hatırlamamızı sağlayan çerezlerdir. Örneğin: tema seçimi (açık/koyu mod), 
                  dil tercihi, kullanıcı adı gibi bilgiler.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">3.4 Hedefleme/Reklam Çerezleri</h3>
                <p className="text-foreground-secondary leading-relaxed">
                  Size ve ilgi alanlarınıza daha uygun içerik ve reklamlar sunmak için kullanılır. 
                  Bu çerezler, aynı reklamı tekrar tekrar görmenizi engellemek için de kullanılabilir.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Kullandığımız Spesifik Çerezler</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Çerez Adı</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Tür</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Süre</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Amaç</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground-secondary">
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">session_id</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Zorunlu</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Oturum</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Kullanıcı oturumunu takip eder</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">theme</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">İşlevsel</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">1 yıl</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Tema tercihini saklar</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">_ga</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Performans</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">2 yıl</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Google Analytics kullanıcı kimliği</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">cookie_consent</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Zorunlu</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">1 yıl</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Çerez tercihlerinizi saklar</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Çerezleri kontrol etmek ve yönetmek için birkaç seçeneğiniz vardır:
              </p>
              <ul className="list-disc list-inside text-foreground-secondary space-y-2 ml-4">
                <li>Tarayıcı ayarlarınızdan çerezleri kabul etmeyi reddedebilir veya silebilirsiniz</li>
                <li>Çoğu tarayıcı, çerezleri otomatik olarak kabul edecek şekilde ayarlanmıştır, 
                    ancak bu ayarları değiştirebilirsiniz</li>
                <li>Web sitemizde yer alan çerez tercih merkezini kullanabilirsiniz</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Tarayıcı Ayarları</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Popüler tarayıcılarda çerez ayarlarına erişim:
              </p>
              <ul className="list-disc list-inside text-foreground-secondary space-y-2 ml-4">
                <li><strong>Google Chrome:</strong> Ayarlar → Gizlilik ve güvenlik → Çerezler ve diğer site verileri</li>
                <li><strong>Mozilla Firefox:</strong> Seçenekler → Gizlilik ve güvenlik → Çerezler ve site verileri</li>
                <li><strong>Safari:</strong> Tercihler → Gizlilik → Çerezler ve web sitesi verileri</li>
                <li><strong>Microsoft Edge:</strong> Ayarlar → Gizlilik, arama ve hizmetler → Çerezler</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Üçüncü Taraf Çerezleri</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Web sitemizde, analiz ve reklam hizmetleri sağlayan üçüncü taraf çerezler kullanılabilir. 
                Bu çerezler, ilgili üçüncü tarafların gizlilik politikalarına tabidir:
              </p>
              <ul className="list-disc list-inside text-foreground-secondary space-y-2 ml-4 mt-4">
                <li>Google Analytics (analiz hizmetleri)</li>
                <li>Google AdWords (reklam hizmetleri)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Çerezlerin Etkisi</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Çerezleri devre dışı bırakırsanız, web sitemizin bazı işlevlerinden 
                yararlanamayabilirsiniz. Örneğin, tema tercihiniz kaydedilmeyebilir veya 
                bazı özellikler düzgün çalışmayabilir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Politika Güncellemeleri</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Bu çerez politikası, yasal düzenlemeler veya hizmet değişiklikleri nedeniyle 
                güncellenebilir. Güncel versiyonu düzenli olarak kontrol etmenizi öneririz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. İletişim</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Çerez politikamız hakkında sorularınız varsa bizimle iletişime geçebilirsiniz:
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
