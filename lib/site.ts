/**
 * Single source of truth for identity data, mirroring CONTENT.md.
 *
 * Everything downstream — JSON-LD, /llms.txt, /llms-full.txt, /api/resume.json
 * and the pages themselves — reads from here, so the name, job title, project
 * names and dates are byte-identical everywhere. That consistency is what lets
 * a generative engine resolve all of these mentions to one entity.
 *
 * Do not add facts here that are not in CONTENT.md. No usage numbers, no
 * revenue, no "improved X by Y%".
 */

export const SITE_URL = 'https://mustafaerhanportakal.com';

/**
 * Date the site copy was last revised. Used for sitemap `lastModified` and
 * schema `dateModified`. Kept as an explicit constant rather than read from
 * file mtimes, which on a CI checkout are the clone time and would make every
 * deploy claim the whole site changed. Bump it when content changes.
 */
export const CONTENT_UPDATED = '2026-08-01';

export const LOCALES = ['en', 'tr'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const person = {
  name: 'Mustafa Erhan Portakal',
  jobTitle: 'Full-Stack Developer',
  email: 'portakalm11@gmail.com',
  phone: '+90 507 413 1160',
  phoneE164: '+905074131160',
  location: {
    city: 'Bursa',
    country: 'Türkiye',
    countryCode: 'TR',
    en: 'Bursa, Türkiye',
    tr: 'Bursa, Türkiye',
  },
  relocation: {
    en: 'Open to relocation to İstanbul, İzmir or Ankara, and to remote work.',
    tr: 'İstanbul, İzmir ve Ankara’ya taşınmaya, ayrıca remote çalışmaya açık.',
  },
  linkedin: 'https://www.linkedin.com/in/mustafa-erhan-portakal-2142101ba/',
  github: 'https://github.com/mustafaep',
  languages: [
    { en: 'Turkish — native', tr: 'Türkçe — ana dil' },
    {
      en: 'English — B2 reading and writing, B1 speaking',
      tr: 'İngilizce — B2 okuma/yazma, B1 konuşma',
    },
  ],
} as const;

/** One-line positioning. Kept short enough to be quoted whole. */
export const tagline = {
  en: 'Full-stack developer who ships production systems end to end — NestJS APIs, Next.js and React interfaces, PostgreSQL and MongoDB data layers, Docker-based deployment.',
  tr: 'Uçtan uca üretim sistemleri geliştiren full-stack developer — NestJS API’leri, Next.js ve React arayüzleri, PostgreSQL ve MongoDB veri katmanları, Docker tabanlı dağıtım.',
} as const;

/**
 * Third-person, context-free summary. Written so that a model quoting only the
 * first sentence still produces a complete, accurate statement.
 */
export const atAGlance = {
  en: 'Mustafa Erhan Portakal is a full-stack developer based in Bursa, Türkiye who builds and ships production web systems end to end. He works primarily in TypeScript with NestJS on the backend, Next.js and React on the frontend, PostgreSQL and MongoDB for data, and Docker for deployment. Since July 2025 he has been co-founder and full-stack developer at Vimof Studios, where he built Auraly-AI, a mood-based music recommendation product. Since November 2025 he has worked as a freelance full-stack developer, delivering an on-premise union management platform for Demokratik Sağlık-Sen and, from April 2026, the live e-commerce platform maisonmeda.com. He holds a BSc in Computer Engineering from Bursa Technical University.',
  tr: 'Mustafa Erhan Portakal, Bursa merkezli, üretim ortamına çıkan web sistemlerini uçtan uca geliştiren bir full-stack developer’dır. Ağırlıklı olarak TypeScript ile çalışır: backend’de NestJS, frontend’de Next.js ve React, veri tarafında PostgreSQL ve MongoDB, dağıtımda Docker. Temmuz 2025’ten bu yana Vimof Studios’ta kurucu ortak ve full-stack developer olarak çalışıyor; burada ruh haline göre müzik öneren Auraly-AI ürününü geliştirdi. Kasım 2025’ten bu yana freelance full-stack developer olarak Demokratik Sağlık-Sen için on-premise bir sendika yönetim platformu, Nisan 2026’dan itibaren de canlı e-ticaret platformu maisonmeda.com’u hayata geçirdi. Bursa Teknik Üniversitesi Bilgisayar Mühendisliği lisans mezunudur.',
} as const;

export type ExperienceEntry = {
  company: string;
  role: string;
  location: { en: string; tr: string };
  start: string;
  end: string | null;
  startISO: string;
  endISO: string | null;
  summary?: { en: string; tr: string };
  bullets: { en: string; tr: string }[];
};

export const experience: ExperienceEntry[] = [
  {
    company: 'Freelance',
    role: 'Full-Stack Developer',
    location: { en: 'Bursa, Türkiye (Remote)', tr: 'Bursa, Türkiye (Remote)' },
    start: 'November 2025',
    end: null,
    startISO: '2025-11',
    endISO: null,
    bullets: [
      {
        en: 'Built the Union Management Platform for Demokratik Sağlık-Sen (November 2025 – July 2026): 30 backend modules and 40 relational data models covering member records, dues and deduction documents, approval flows, accounting, content and reporting.',
        tr: 'Demokratik Sağlık-Sen için Union Management Platform’u geliştirdim (Kasım 2025 – Temmuz 2026): üye kayıtları, aidat ve kesinti belgeleri, onay süreçleri, muhasebe, içerik ve raporlamayı kapsayan 30 backend modülü ve 40 ilişkisel veri modeli.',
      },
      {
        en: 'Built maisonmeda.com from April 2026 onward: a live e-commerce platform for a boutique, as a Turborepo monorepo holding a Next.js 16 storefront, an admin panel and a NestJS API.',
        tr: 'Nisan 2026’dan itibaren maisonmeda.com’u geliştirdim: bir butik için canlı e-ticaret platformu; Next.js 16 storefront, admin panel ve NestJS API’yi barındıran Turborepo monorepo.',
      },
    ],
  },
  {
    company: 'Vimof Studios',
    role: 'Co-Founder & Full-Stack Developer',
    location: { en: 'Remote', tr: 'Remote' },
    start: 'July 2025',
    end: null,
    startISO: '2025-07',
    endISO: null,
    summary: {
      en: 'A two-person independent software studio. I handle development; my partner handles QA and testing.',
      tr: 'İki kişilik bağımsız yazılım stüdyosu. Geliştirme bende, ortağımda QA ve test.',
    },
    bullets: [
      {
        en: 'Built Auraly-AI, a mood-based music recommendation product, as a TypeScript monorepo of four applications: a NestJS 11 API, a Next.js 15 web app, an admin panel and a React Native (Expo) mobile app sharing a typed DTO package.',
        tr: 'Ruh haline göre müzik öneren Auraly-AI ürününü, dört uygulamalı bir TypeScript monorepo olarak geliştirdim: NestJS 11 API, Next.js 15 web, admin panel ve ortak tipli DTO paketini kullanan React Native (Expo) mobil uygulama.',
      },
      {
        en: 'Implemented 102 REST endpoints across 17 controllers and 27 MongoDB schemas with Mongoose 8.',
        tr: '17 controller üzerinde 102 REST endpoint ve Mongoose 8 ile 27 MongoDB şeması yazdım.',
      },
      {
        en: 'Integrated the Spotify Web API (OAuth, token refresh, library access, Connect playback control) and Google Gemini (mood interpretation, playlist generation).',
        tr: 'Spotify Web API (OAuth, token yenileme, kütüphane erişimi, Connect oynatma kontrolü) ve Google Gemini (ruh hali yorumlama, çalma listesi üretimi) entegrasyonlarını yaptım.',
      },
      {
        en: 'Rewrote the recommendation pipeline after the Spotify Recommendations endpoint was deprecated, designing and documenting a new algorithm behind a feature flag with variant positioning.',
        tr: 'Spotify Recommendations endpoint’i kullanımdan kalkınca öneri hattını yeniden yazdım; feature flag ve varyant konumlandırmalı yeni bir algoritma tasarlayıp dokümante ettim.',
      },
      {
        en: 'Shipped the mobile app with Expo Router: audio playback, push notifications, deep linking, i18next and expo-localization.',
        tr: 'Mobil uygulamayı Expo Router ile geliştirdim: ses oynatma, push bildirim, deep linking, i18next ve expo-localization.',
      },
      {
        en: 'Deployed with Docker Compose and Nginx, CI/CD on GitHub Actions, with the admin panel behind Cloudflare Access. 241 commits over 13 months; iOS and Android release targeted for August 2026.',
        tr: 'Docker Compose ve Nginx ile dağıttım, CI/CD GitHub Actions üzerinde, admin panel Cloudflare Access arkasında. 13 ayda 241 commit; iOS ve Android çıkışı Ağustos 2026 hedefli.',
      },
      {
        en: 'Also built menu/UI flows and data-saving logic in Unreal Engine 5 Blueprint for a game project.',
        tr: 'Ayrıca bir oyun projesinde Unreal Engine 5 Blueprint ile menü/UI akışları ve veri kaydetme mantığı geliştirdim.',
      },
    ],
  },
  {
    company: 'BRM Bilgisayar',
    role: 'Software Developer Intern',
    location: { en: 'Bursa, Türkiye', tr: 'Bursa, Türkiye' },
    start: 'September 2024',
    end: 'February 2025',
    startISO: '2024-09',
    endISO: '2025-02',
    summary: {
      en: 'İMEP vocational training programme plus a summer internship — six months of industry experience inside a 20-person development team.',
      tr: 'İMEP mesleki eğitim programı ve yaz stajı — 20 kişilik bir geliştirme ekibi içinde altı aylık sektör deneyimi.',
    },
    bullets: [
      {
        en: 'Built desktop applications with .NET 8 and web applications with ASP.NET Core, using Entity Framework and Microsoft SQL Server.',
        tr: '.NET 8 ile masaüstü, ASP.NET Core ile web uygulamaları geliştirdim; Entity Framework ve Microsoft SQL Server kullandım.',
      },
      {
        en: 'Built push notification infrastructure with a OneSignal integration and real-time communication features over WebSocket.',
        tr: 'OneSignal entegrasyonu ile push bildirim altyapısı ve WebSocket üzerinden gerçek zamanlı iletişim özellikleri geliştirdim.',
      },
      {
        en: 'Worked on database design and third-party API integrations within a layered enterprise architecture and a code review process.',
        tr: 'Katmanlı kurumsal mimari ve code review süreci içinde veritabanı tasarımı ve üçüncü parti API entegrasyonları üzerinde çalıştım.',
      },
      {
        en: 'Closing project: SoccerApp, an ASP.NET Core 8 football team management panel.',
        tr: 'Kapanış projesi: SoccerApp, ASP.NET Core 8 futbol takımı yönetim paneli.',
      },
    ],
  },
];

export type ProjectMeta = {
  slug: string;
  name: string;
  /** Order in the showcase, per CONTENT.md. */
  rank: number;
  live: string | null;
  github: string | null;
  featured: boolean;
};

/** Canonical project registry. MDX frontmatter is validated against this. */
export const projects: ProjectMeta[] = [
  {
    slug: 'auraly-ai',
    name: 'Auraly-AI',
    rank: 1,
    live: 'https://auraly-ai.com',
    github: null,
    featured: true,
  },
  {
    slug: 'maisonmeda',
    name: 'maisonmeda.com',
    rank: 2,
    live: 'https://maisonmeda.com',
    github: null,
    featured: true,
  },
  {
    slug: 'union-management-platform',
    name: 'Union Management Platform',
    rank: 3,
    live: null,
    github: null,
    featured: true,
  },
  {
    slug: 'letter-to-stars',
    name: 'Letter to Stars',
    rank: 4,
    live: 'https://lettertostars.mustafaerhanportakal.com',
    github: null,
    featured: false,
  },
  {
    slug: 'moodweave',
    name: 'MoodWeave',
    rank: 5,
    live: null,
    github: 'https://github.com/MustafaEP/moodweave',
    featured: false,
  },
  {
    slug: 'wchatapi',
    name: 'wchatapi',
    rank: 6,
    live: null,
    github: null,
    featured: false,
  },
  {
    slug: 'soccerapp',
    name: 'SoccerApp',
    rank: 7,
    live: null,
    github: 'https://github.com/mustafaep/SoccerApp',
    featured: false,
  },
];

export const education = {
  degree: { en: 'BSc Computer Engineering', tr: 'Bilgisayar Mühendisliği (Lisans)' },
  institution: {
    en: 'Bursa Technical University',
    tr: 'Bursa Teknik Üniversitesi',
  },
  location: { en: 'Bursa, Türkiye', tr: 'Bursa, Türkiye' },
  start: '2020',
  end: '2025',
  note: {
    en: 'Graduation project: Auraly-AI.',
    tr: 'Bitirme projesi: Auraly-AI.',
  },
} as const;

export const award = {
  name: 'TÜBİTAK 2209-A Research Support',
  nameTr: 'TÜBİTAK 2209-A Araştırma Desteği',
  project: {
    en: 'Rover Wheel Design with an Anti-Skid System',
    tr: 'Patinaj Engelleme Sistemli Rover Tekerleği Tasarımı',
  },
  period: { en: '2022 – November 2024', tr: '2022 – Kasım 2024' },
  url: 'https://github.com/Rover-Anti-Skid-System',
  description: {
    en: 'Supported and successfully completed under the 2022/1 term of the TÜBİTAK 2209-A University Students Research Projects Support Programme. The project addressed skidding and entrapment on the fine, sandy terrain of the Martian surface. As the only computer engineer on a four-person team I was responsible for all software and electronics: an Arduino control loop that read distance and motion sensors to detect entrapment and drove servo-steered DC motors.',
    tr: '2209-A Üniversite Öğrencileri Araştırma Projeleri Destekleme Programı 2022/1 dönemi kapsamında desteklendi ve başarıyla tamamlandı. Proje, Mars yüzeyindeki ince ve kumlu zeminlerde patinaj ve sıkışma problemine çözüm arıyordu. Dört kişilik ekipteki tek bilgisayar mühendisi olarak tüm yazılım ve elektronikten sorumluydum: mesafe ve hareket sensörlerini okuyup sıkışmayı tespit eden, servo yönlendirmeli DC motorları süren bir Arduino kontrol döngüsü.',
  },
} as const;

export const certificate = {
  name: 'IBM Full Stack Software Developer',
  issuer: 'Coursera',
  type: { en: 'Professional Certificate', tr: 'Professional Certificate' },
  date: { en: 'January 2026', tr: 'Ocak 2026' },
  dateISO: '2026-01',
  url: 'https://coursera.org/verify/professional-cert/ZA0GJFIPNUUT',
  description: {
    en: 'A 15-course programme covering cloud-native development, microservices, Docker, Kubernetes, OpenShift, CI/CD, React, Node.js, Django, databases and application security.',
    tr: '15 derslik program: cloud-native geliştirme, mikroservisler, Docker, Kubernetes, OpenShift, CI/CD, React, Node.js, Django, veritabanları ve uygulama güvenliği.',
  },
} as const;

export const skills = [
  {
    key: 'languages',
    label: { en: 'Languages', tr: 'Diller' },
    items: ['TypeScript', 'JavaScript', 'Python', 'C#', 'SQL'],
  },
  {
    key: 'backend',
    label: { en: 'Backend', tr: 'Backend' },
    items: ['NestJS', 'Node.js', 'Express', 'ASP.NET Core', 'Django', 'FastAPI'],
  },
  {
    key: 'frontend',
    label: { en: 'Frontend', tr: 'Frontend' },
    items: [
      'React 19',
      'Next.js 15/16 (App Router)',
      'Tailwind CSS 4',
      'Material-UI',
      'TanStack Query',
      'Vite',
    ],
  },
  {
    key: 'mobile',
    label: { en: 'Mobile', tr: 'Mobil' },
    items: ['React Native (Expo)', 'Expo Router'],
  },
  {
    key: 'databases',
    label: { en: 'Databases', tr: 'Veritabanı' },
    items: ['PostgreSQL', 'MongoDB', 'Microsoft SQL Server', 'Redis'],
  },
  {
    key: 'orm',
    label: { en: 'ORM', tr: 'ORM' },
    items: ['Prisma', 'Mongoose', 'Entity Framework'],
  },
  {
    key: 'devops',
    label: { en: 'DevOps', tr: 'DevOps' },
    items: [
      'Docker',
      'Docker Compose',
      'Nginx',
      'GitHub Actions',
      'Turborepo',
      'pnpm',
      'VPS',
      "Let's Encrypt",
    ],
  },
  {
    key: 'integrations',
    label: { en: 'Integrations', tr: 'Entegrasyon' },
    items: [
      'Spotify Web API',
      'Google Gemini',
      'iyzico',
      'Trendyol Marketplace API',
      'AWS SES',
      'Resend',
      'OneSignal',
      'Baileys',
    ],
  },
  {
    key: 'practices',
    label: { en: 'Practices', tr: 'Yaklaşım' },
    items: [
      'REST API design',
      'JWT authentication',
      'Role-based access control',
      'Background queues (BullMQ)',
      'Swagger/OpenAPI',
      'Architecture Decision Records (ADR)',
      'Monorepo',
    ],
  },
] as const;

/** Flat list for schema.org `knowsAbout`. */
export const knowsAbout: string[] = skills.flatMap((group) => [...group.items]);

/** Absolute URL for a path, respecting locale prefixing. */
export function localePath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  return clean ? `${prefix}/${clean}` : prefix || '/';
}

export function absoluteUrl(locale: Locale, path = ''): string {
  const p = localePath(locale, path);
  return p === '/' ? `${SITE_URL}/` : `${SITE_URL}${p}`;
}
