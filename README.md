# Mustafa Erhan Portakal — Portfolio

Kişisel portfolyo sitesi. Yayında: [mustafaerhanportakal.com](https://mustafaerhanportakal.com)

İngilizce varsayılan dil, kökte yayımlanır. Türkçe `/tr` altında, aynı yol
yapısıyla yansıtılır.

## Teknolojiler

- **Next.js 15** (App Router) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS 4** — yapılandırma CSS içinde, `app/globals.css`
- **MDX** — `gray-matter` + `next-mdx-remote/rsc`
- **next-themes** — sistem tercihini izleyen karanlık/aydınlık tema
- **pnpm** · Node 22 · Netlify

Tüm sayfalar build sırasında statik olarak üretilir. İstemci tarafında veri
çekilmez; her metin HTML kaynağında bulunur.

## Geliştirme

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

```bash
pnpm build        # production build
pnpm start        # build çıktısını yerelde çalıştır
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
```

## Proje yapısı

```
app/
  (en)/              İngilizce ağaç — kökte yayımlanır (/, /about, /projects …)
  (tr)/tr/           Türkçe ağaç — /tr altında
  robots.ts          AI tarayıcıları dahil, üretilen robots.txt
  sitemap.ts         İki dil, hreflang alternatifleriyle
  llms.txt/          Dil modelleri için kısa tanıtım
  llms-full.txt/     Tüm biyografi ve proje metinleri, düz metin
  api/resume.json/   JSON Resume şemasında özgeçmiş
  rss.xml/           Blog akışı
components/
  views/             Sayfa gövdeleri — iki dil de bunları kullanır
  primitives.tsx     Shell, Row, FactList, TechStack, OutLink
content/
  projects/{en,tr}/  Proje MDX dosyaları
  blog/{en,tr}/      Yazı MDX dosyaları
lib/
  site.ts            Kimlik verisinin tek kaynağı
  content.ts         MDX yükleyiciler, frontmatter doğrulama
  jsonld.ts          Tipli schema.org üreticileri
  metadata.ts        generateMetadata yardımcıları
messages/            Arayüz metinleri (en.json / tr.json)
```

`(en)` ve `(tr)` iki ayrı **root layout**'tur. Bunun sebebi `<html lang>`
niteliğinin dile göre gerçekten doğru olması; hydration sonrası JavaScript ile
düzeltilen bir `lang` yerine sunucudan doğru gelir.

## İçerik kuralları

**`CONTENT.md` sitedeki tüm metinlerin tek doğru kaynağıdır.** Orada olmayan
hiçbir iş, proje, teknoloji, tarih, müşteri, ödül veya sertifika siteye
eklenmez. Kullanıcı sayısı, indirme, gelir, "%X iyileştirme" gibi metrikler
yazılmaz — bu veriler mevcut değildir.

Kimlik bilgileri (ad, ünvan, tarihler, proje adları) `lib/site.ts` içinde
tutulur. Sayfalar, JSON-LD, `llms.txt` ve `resume.json` hepsi buradan okur;
böylece aynı isim her yerde birebir aynı yazılır.

## Yeni proje ekleme

1. `lib/site.ts` içindeki `projects` dizisine kayıt ekle — `slug`, `name`,
   `rank` (vitrin sırası), `live`, `github`, `featured`.
2. `content/projects/en/<slug>.mdx` ve `content/projects/tr/<slug>.mdx`
   dosyalarını oluştur.

Frontmatter alanları:

```yaml
---
title: Proje adı
tagline: Listelerde görünen tek satırlık tanım.
summary: >
  Tek başına alıntılandığında da eksiksiz olan ilk cümle. Arama motorları ve
  dil modelleri genellikle sadece bunu alır.
role: Full-Stack Developer
period: Nisan 2026 – devam ediyor   # CONTENT.md'de tarih yoksa bu alanı yaz
status: Yayında
stack:
  - NestJS
  - PostgreSQL
---
```

`period` isteğe bağlıdır; tarihi bilinmeyen projeler için **yazma**, tahmin
etme. Rota, site haritası kaydı, OG görseli ve JSON-LD dosyadan üretilir.

`featured: true` olan projeler için gövde bir vaka çalışmasıdır: problem →
yaklaşım → mimari → alınan kararlar → sonuç. Başlıklar bir soruyu ima etmeli ve
her bölümün ilk cümlesi doğrudan cevap vermelidir.

## Yeni blog yazısı ekleme

`content/blog/en/<slug>.mdx` ve `content/blog/tr/<slug>.mdx` oluştur.
`content/blog/en/hello.mdx` bir iskelet olarak duruyor — `draft: true` olduğu
için yayımlanmıyor. Yayımlamak için o satırı sil.

```yaml
---
title: Başlık
summary: Listede, arama sonuçlarında ve RSS'te görünen tam cümle.
date: '2026-08-01'
tags:
  - architecture
draft: true
---
```

## Yayınlama

`main` dalına push edildiğinde Netlify otomatik deploy eder
(`netlify.toml` → `pnpm build`). Diğer dallar branch deploy preview'ı üretir.

Rota adresi değişirse `netlify.toml` içine 301 yönlendirme eklenmelidir.

---

© Mustafa Erhan Portakal — [mustafaerhanportakal.com](https://mustafaerhanportakal.com)
