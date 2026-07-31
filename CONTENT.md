# İÇERİK — Tek Doğru Kaynak

> Bu dosya, portfolyo sitesindeki tüm metinlerin tek doğru kaynağıdır.
> Burada olmayan hiçbir iş, proje, teknoloji, tarih, müşteri, ödül veya sertifika siteye eklenmez.
> **Kullanıcı sayısı, indirme, gelir, "%X iyileştirme" gibi metrikler yazılmaz** — bu veriler mevcut değildir.
> İçerik gerekiyor ve burada yoksa: uydurma, sor.

---

## Kimlik

- **Ad:** Mustafa Erhan Portakal
- **Ünvan:** Full-Stack Developer
- **Konum:** Bursa, Türkiye (İstanbul, İzmir, Ankara'ya taşınabilir; remote'a açık)
- **E-posta:** portakalm11@gmail.com
- **Telefon:** +90 507 413 1160
- **LinkedIn:** https://www.linkedin.com/in/mustafa-erhan-portakal-2142101ba/
- **GitHub:** https://github.com/mustafaep
- **Diller:** Türkçe (ana dil), İngilizce (B2 okuma/yazma, B1 konuşma)

## Kısa tanıtım

Full-stack developer who ships production systems end to end — NestJS APIs, Next.js and React interfaces, PostgreSQL and MongoDB data layers, Docker-based deployment.

---

## Deneyim

### Freelance Full-Stack Developer

Bursa, Türkiye (Remote) · Kasım 2025 – devam ediyor

#### Union Management Platform — Demokratik Sağlık-Sen (Kasım 2025 – Temmuz 2026)

- Bir sağlık sendikası için üye kayıtları, aidat/kesinti belgeleri, onay süreçleri, muhasebe, içerik ve raporlamayı kapsayan yönetim platformu: 30 backend modülü, 40 ilişkisel veri modeli
- NestJS 11 + Prisma 6 + PostgreSQL 16; bildirim gönderimi ve PDF üretimi Redis + BullMQ kuyruklarına taşındı
- Dinamik rol tabanlı yetkilendirme — yönetici kendi rollerini oluşturup izin atayabiliyor
- Puppeteer ile PDF üretimi, Excel export, AWS SES + WhatsApp + SMS bildirim kanalları
- İl / ilçe / şube bölgesel hiyerarşi ve tüm kayıt değişikliklerini tutan audit log
- React 19 + Vite 7 + Material-UI 7 + TanStack Query yönetim arayüzü, Recharts panoları
- Docker Compose + Nginx Proxy Manager ile paketlenip müşterinin kendi altyapısına **on-premise** kuruldu; API Swagger/OpenAPI ile dokümante edildi
- Sistem aktif kullanımdayken 82 sürümlü Prisma migration

#### E-Commerce Platform — maisonmeda.com (Nisan 2026 – devam ediyor)

**Canlı:** https://maisonmeda.com

- Bir butik için canlı e-ticaret platformu; Turborepo monorepo: Next.js 16 storefront + admin panel + NestJS API
- Trendyol pazaryeri senkronizasyonu: 30 dakikada bir çalışan zamanlanmış görev, 100+ ürünü içe aktarıp mutabakat yapıyor
- iyzico ödeme entegrasyonu ve sipariş yaşam döngüsü; 13 Prisma modeli, ~58 REST endpoint, 18 migration
- httpOnly cookie içinde JWT, bcrypt, Zod doğrulama; müşteri ve admin oturumları ayrı NestJS guard'ları arkasında
- Mimari kararlar ADR olarak yazıldı — CVE-2025-29927 nedeniyle yetkilendirme Next.js middleware'inden API katmanı guard'larına taşındı, reddedilen alternatifler gerekçeleriyle kayda geçti
- Docker Compose + Nginx; Resend ile işlemsel e-posta, sharp ile görsel işleme

### Co-Founder & Full-Stack Developer — Vimof Studios

Remote · Temmuz 2025 – devam ediyor

İki kişilik bağımsız yazılım stüdyosu. Geliştirme bende, ortağımda QA/test.

- **Auraly-AI** — ruh haline göre müzik öneren ürün. **Canlı:** https://auraly-ai.com
- TypeScript monorepo, dört uygulama: NestJS 11 API, Next.js 15 web, admin panel, React Native (Expo) mobil; ortak tipli DTO paketi
- 17 controller üzerinde 102 REST endpoint, Mongoose 8 ile 27 MongoDB şeması
- Spotify Web API (OAuth, token yenileme, kütüphane erişimi, Connect oynatma kontrolü) ve Google Gemini (ruh hali yorumlama, çalma listesi üretimi)
- Spotify Recommendations endpoint'i kullanımdan kalkınca öneri hattı yeniden yazıldı; feature flag ve varyant konumlandırmalı yeni algoritma tasarlanıp dokümante edildi
- Expo Router ile mobil: ses oynatma, push bildirim, deep linking, i18next + expo-localization
- Spotify/YouTube oynatma senkronizasyonu — oturum sağlayıcılar arasında devam ediyor
- Docker Compose + Nginx, GitHub Actions CI/CD, admin panel Cloudflare Access arkasında
- 13 ayda 241 commit. iOS ve Android çıkışı Ağustos 2026 hedefli
- Ayrıca bir oyun projesinde Unreal Engine 5 Blueprint ile menü/UI akışları ve veri kaydetme mantığı

### Software Developer Intern — BRM Bilgisayar

Bursa · Eylül 2024 – Şubat 2025

İMEP mesleki eğitim programı + yaz stajı; 20 kişilik geliştirme ekibi içinde altı aylık sektör deneyimi.

- .NET 8 ile masaüstü, ASP.NET Core ile web uygulamaları; Entity Framework + Microsoft SQL Server
- OneSignal entegrasyonu ile push bildirim altyapısı
- WebSocket ile gerçek zamanlı iletişim özellikleri
- Veritabanı tasarımı ve üçüncü parti API entegrasyonları; katmanlı kurumsal mimari ve code review süreci
- Kapanış projesi: **SoccerApp**, ASP.NET Core 8 futbol takımı yönetim paneli — https://github.com/mustafaep/SoccerApp

---

## Diğer projeler

### Letter to Stars

**Canlı:** https://lettertostars.mustafaerhanportakal.com

İngilizce günlük tutma ve öğrenme platformu. Kullanıcı İngilizce günlük yazıyor, Gemini metni seçilen IELTS seviyesine (6/7/8/9) göre yeniden yazıyor, yeni kelimeleri Türkçe anlamlarıyla çıkarıyor. Her gün bir yıldız — görsel ilerleme haritası.

Mimari: React + Vite + Tailwind frontend, NestJS + Prisma + PostgreSQL backend, FastAPI + Gemini AI servisi, Django admin/analytics paneli, Docker Compose deployment. AI çıktısı yapılandırılmış JSON döner: yeniden yazılmış metin, gramer düzeltmeleri, yeni kelimeler, yazım ipuçları, güçlü/zayıf yönler, genel geri bildirim.

### MoodWeave

Ocak – Mart 2026 · https://github.com/MustafaEP/moodweave

Gateway mimarisi öğrenmek için kurulmuş çok dilli mikroservis sistemi: Nginx ters vekil → NestJS API gateway → Django servisi (Spotify) + FastAPI servisi (ruh hali analizi), React (Vite) istemci. İç servisler internete kapalı, Docker healthcheck ile otomatik restart. GitHub Actions ile main'e her merge'de SSH üzerinden VPS'e dokunmadan deployment. Let's Encrypt HTTPS, rate limiting, yapılandırılmış loglama. 119 commit.

> **Şu an canlı değil — sadece GitHub bağlantısı ver, canlı link verme.**

### wchatapi

Nisan 2026

Kendi barındırılan WhatsApp mesajlaşma API'si: Node.js + Express 5 + Baileys, oturum izleme için Next.js panel. API key doğrulama, HMAC imzalı webhook, rate limiting, graceful shutdown, Docker.

---

## Eğitim

**Bilgisayar Mühendisliği (BSc)** — Bursa Teknik Üniversitesi, Bursa, Türkiye · 2020 – 2025

Bitirme projesi: Auraly-AI.

> **Not ortalamasını hiçbir yerde yazma.**

---

## Ödül

**TÜBİTAK 2209-A Araştırma Desteği** — "Patinaj Engelleme Sistemli Rover Tekerleği Tasarımı" · 2022 – Kasım 2024

2209-A Üniversite Öğrencileri Araştırma Projeleri Destekleme Programı 2022/1 dönemi kapsamında desteklendi ve başarıyla tamamlandı. Mars yüzeyindeki ince ve kumlu zeminlerde patinaj ve sıkışma problemine çözüm. Dört kişilik ekipteki tek bilgisayar mühendisi olarak tüm yazılım ve elektronikten sorumluydum: mesafe ve hareket sensörlerini okuyup sıkışmayı tespit eden, servo yönlendirmeli DC motorları süren Arduino kontrol döngüsü.

https://github.com/Rover-Anti-Skid-System

---

## Sertifika

**IBM Full Stack Software Developer** — Coursera Professional Certificate · Ocak 2026

15 derslik program: cloud-native geliştirme, mikroservisler, Docker, Kubernetes, OpenShift, CI/CD, React, Node.js, Django, veritabanları, uygulama güvenliği.

Doğrulama: https://coursera.org/verify/professional-cert/ZA0GJFIPNUUT

---

## Teknik yetenekler

- **Diller:** TypeScript, JavaScript, Python, C#, SQL
- **Backend:** NestJS, Node.js, Express, ASP.NET Core, Django, FastAPI
- **Frontend:** React 19, Next.js 15/16 (App Router), Tailwind CSS 4, Material-UI, TanStack Query, Vite
- **Mobil:** React Native (Expo), Expo Router
- **Veritabanı:** PostgreSQL, MongoDB, Microsoft SQL Server, Redis
- **ORM:** Prisma, Mongoose, Entity Framework
- **DevOps:** Docker, Docker Compose, Nginx, GitHub Actions, Turborepo, pnpm, VPS, Let's Encrypt
- **Entegrasyon:** Spotify Web API, Google Gemini, iyzico, Trendyol Marketplace API, AWS SES, Resend, OneSignal, Baileys
- **Yaklaşım:** REST API tasarımı, JWT kimlik doğrulama, rol tabanlı yetkilendirme, arka plan kuyrukları (BullMQ), Swagger/OpenAPI, mimari karar kayıtları (ADR), monorepo

> **Beceri seviyesi göstergesi (yüzde, yıldız, bar) kullanma.**

---

## Proje vitrin sırası

1. **Auraly-AI** (canlı) — vitrin
2. **maisonmeda.com** (canlı, gerçek müşteri)
3. **Demokratik Sağlık-Sen paneli** (en büyük sistem, canlı link yok — on-premise)
4. **Letter to Stars** (canlı)
5. **MoodWeave** (GitHub)
6. **wchatapi** (GitHub)
7. **SoccerApp** (GitHub)

İlk üçü için `/projects/[slug]` altında **vaka çalışması** yaz: problem → yaklaşım → mimari → aldığım kararlar → sonuç.

Öne çıkarılacak iki teknik anlatı — sitedeki en değerli içerik bunlar:

- **maisonmeda:** ADR hikâyesi — CVE-2025-29927 nedeniyle yetkilendirmenin Next.js middleware'inden API katmanı guard'larına taşınması
- **Auraly-AI:** Spotify Recommendations endpoint'i kapanınca öneri hattının yeniden yazılması

---

## Varlık tutarlılığı kuralları

Aşağıdakiler sayfada, JSON-LD'de, `llms.txt`'te ve `resume.json`'da **birebir aynı** yazılır:

- Ad: **Mustafa Erhan Portakal**
- Ünvan: **Full-Stack Developer**
- Konum: **Bursa, Türkiye**
- Üniversite: **Bursa Technical University** (İngilizce metinlerde), **Bursa Teknik Üniversitesi** (Türkçe metinlerde)
- Şirket/ürün adları: **Vimof Studios**, **Auraly-AI**, **maisonmeda.com**, **Demokratik Sağlık-Sen**, **BRM Bilgisayar**, **Letter to Stars**, **MoodWeave**, **wchatapi**, **SoccerApp**

Tarihler net yazılır: "since 2025" değil **"from July 2025"**; "recently" değil **"in April 2026"**.
