# tarik.caykara.com

## Proje

Tarık Çaykara'nın LinkedIn'den bağlanacak, onu kripto operasyonu ve kendi yazdığı iç araçlarla
tanıtan kişisel portföy/CV sitesi. Adres `https://tarik.caykara.com`. Kapsam (v1): tek uzun ana
sayfa + Notes (kısa yazılar, RSS).

## Kararlar

- **Adres:** `tarik.caykara.com`. `caykara.com` kökü başka birinin sitesi; ona dokunulmaz.
- **Konumlandırma:** hedef, kripto şirketlerinde operasyon rolleri. Risk & treasury uzmanlığı
  iddia edilmez; şirket adı, konum, portre ve eğitim sitede yer almaz.
- **Tasarım:** hibrit. Tasarımı kullanıcı Claude Design'da keşfeder ve onaylar
  (`docs/DESIGN-BRIEF.md`, çıktı `design/handoff/`); üretim kodunu ajan bu repoda yazar.
- **Dil:** site yalnızca İngilizce.
- **v1 kapsamı:** tek uzun ana sayfa + Notes.
- **Stack:** Astro 7 statik çıktı. npm + Node 24 (Bun yok). TypeScript `astro/tsconfigs/strict`.
  Prettier + `prettier-plugin-astro` (Biome yok).
- **Barındırma (2026-11-22):** site Tarık'ın web sunucusunda Docker'da çalışır.
  Sunucunun bütün uygulamalar için ortak kuralları (erişim, onay, sudo ve docker grubu,
  `/opt/apps/<uygulama>/` düzeni, yayına alma, geri alma, port tablosu, tunnel ve route'lar) bu
  repoda değil, sahibinin özel notlarındadır; sunucuda bir komut çalıştırmadan önce okunur. Bu
  siteye özgü olanlar aşağıdadır. `Dockerfile` iki aşamalıdır: `node` imajında
  `npm ci && npm run build`, ardından `dist/` ve `nginx.conf` `nginxinc/nginx-unprivileged`
  imajına; imajlar sürüm ve digest ile sabitlenir. Sunucuda `/opt/apps/tarik.caykara.com/`
  altında `docker-compose.yml` ve `.env` (`SITE_VERSION=<sürüm>`) bulunur; compose imajı
  `tarik-caykara-com:<sürüm>` olarak çalıştırır ve konteyneri `127.0.0.1:8080`'de açar. `tarik`
  CNAME kaydı ve route'u (`tarik.caykara.com` → `http://127.0.0.1:8080`) `caykara.com` zonundadır.
  Güvenlik başlıkları ve tek URL yönlendirmeleri (`.html` ve sondaki `/` olmadan) `nginx.conf`'tadır;
  HSTS ve `nosniff` Cloudflare zon ayarından gelir. `scripts/check-site.sh` hepsini denetler.
- İçerik kaynağı `docs/CONTENT.md`. Sayı, kurum, sonuç uydurulmaz; eksik bilgi kullanıcıya sorulur.

## Dil

- Sohbet ve `docs/` Türkçe.
- Site metni İngilizce.
- Kod, kod yorumu, commit mesajı, PR başlığı ve açıklaması İngilizce.

## Çalışma yöntemi

- Ana dal `master`. Dal adı `<type>/<slug>` (ör. `feat/astro-scaffold`).
- **Repo public'tir.** CLAUDE.md'ye, koda, issue, PR ve commit metnine sunucuya erişim ayrıntısı
  (SSH, kullanıcı, sudo, token ya da tunnel yapılandırması), hesap, aile ya da müşteri bilgisi ve
  sahibinin özel notlarından içerik yazılmaz.
- Commit'ler Conventional Commits, İngilizce, emir kipinde. Tipler: `feat`, `fix`, `refactor`,
  `test`, `docs`, `build`, `ci`, `chore`. Commit kimliği global kimlik (`tarik@caykara.com`).
  `Co-Authored-By` satırı eklenmez.
- **Sürüm:** `package.json`'daki `version` sitenin sürümüdür (semver); her sayfada
  `<meta name="version">` olarak yayınlanır. Site çıktısını (`dist/`) ya da yayınlanan imajı
  (`Dockerfile`, `nginx.conf`, `docker-compose.yml`) değiştiren her PR, commit'ten önce sürümü
  `npm version <patch|minor|major> --no-git-tag-version` ile artırır: `fix` → patch, `feat` →
  minor, kırıcı değişiklik (ör. bir URL'nin kaldırılması) → major, diğer tipler → patch. Yalnızca
  `docs/`, `CLAUDE.md` ya da CI'ı değiştiren PR sürüme dokunmaz.
- **Bağımlılıklar:** Dependabot (`.github/dependabot.yml`) ayda bir güncelleme PR'ı açar; yeni bir
  sürüm 7 gün bekledikten sonra önerilir, güvenlik güncellemeleri beklemez. Minor ve patch
  güncellemeleri gruplar halinde gelir: `site` (production bağımlılıkları), `tooling` (geliştirme
  araçları), GitHub Actions `actions` grubunda, Docker imajları `images` grubunda (Node major'ı
  önerilmez, `engines` Node 24; nginx yalnızca stable dalın (çift minor) yama sürümleriyle gelir,
  mainline (tek minor) önerilmez); major'lar tek tek. Dependabot PR'ı da sürüm kuralına uyar:
  `dist/`'i ya da imajı değiştiriyorsa (`images` PR'ları her zaman; diğerlerinde dalda ve
  `master`'da `npm run build` çıktısı karşılaştırılır) merge'den önce dala
  `npm version patch --no-git-tag-version` commit'i eklenir; `tooling` ve `actions` PR'ları sürüme
  dokunmaz. Major'da önce changelog okunur. Dependabot uyarıları ve güvenlik güncellemeleri repo
  ayarlarında açıktır.
- Her PR squash merge edilir; GitHub'da yalnızca squash açık, birleşen dal otomatik silinir.
- İş GitHub issue ve milestone'larla izlenir. Milestone adı `Phase N — …`. Issue başlığı
  Conventional Commits biçiminde ve İngilizce; gövdesi bağlamı, yapılacak işi ve bir **Done when**
  satırını içerir. Kullanıcının kendi işlerinde gövdeye `**Owner:** Tarık` yazılır. Proje panosu,
  etiket sistemi, assignee ve bitiş tarihi kullanılmaz.
- PR açıklaması kapattığı issue'yu `Closes #N` ile bağlar.
- Ajan PR'ları kendisi `gh pr merge <N> --squash` ile birleştirir. Şart: CI yeşil ve ajanın kendi
  doğrulaması (kod PR'ında yerel önizleme dahil) bitmiş. Kullanıcı sorun görürse bildirir; düzeltme
  yeni PR'la gelir.
- Merge'den sonra `master`'a geçilir, `git pull --ff-only`, yerel dal `git branch -D` ile silinir.
- **Yayına alma:** sürümü artıran PR merge edildikten sonra ajan `master`'ı çeker, merge commit'ini
  etiketler ve gönderir: `git tag -a v<sürüm> -m v<sürüm> && git push origin v<sürüm>`. Ardından
  sunucunun ortak "Yayına alma" akışı izlenir; bu sitede imaj `tarik-caykara-com:<sürüm>`,
  uygulama dizini `/opt/apps/tarik.caykara.com/`, sürüm değişkeni `SITE_VERSION`'dır ve compose
  dosyası değiştiyse `git show v<sürüm>:docker-compose.yml` sunucuya rsync'lenir. Ajan ardından
  `bash scripts/check-site.sh https://tarik.caykara.com` çalıştırır: canlıdaki
  `<meta name="version">` etiketteki sürümle aynı olmalı, yönlendirme ve başlık denetimleri
  geçmelidir. Geri almak için `SITE_VERSION` önceki sürüme çevrilir (ortak kurallar, "Geri alma").

## Panel işleri

Cloudflare, Google (Analytics, Search Console) ve LinkedIn işleri kullanıcıya link + numaralı adım
listesi olarak verilir; tarayıcı otomasyonu denenmez.

## Telefondan bakma

`npm run preview -- --host`. Astro 7 önizlemesi kendini arka plana alır; durdurmak için
`npx astro preview stop`. Adres `http://$(ipconfig getifaddr en0):4321/`.
