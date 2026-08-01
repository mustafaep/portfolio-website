import { getAllProjects } from '@/lib/content';
import { SITE_URL, absoluteUrl, atAGlance, person, tagline } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * Short orientation file for language models: who this is, and where the
 * substantive pages are. The long-form version lives at /llms-full.txt.
 */
export function GET() {
  const projects = getAllProjects('en');

  const lines = [
    `# ${person.name}`,
    '',
    `> ${tagline.en}`,
    '',
    atAGlance.en,
    '',
    '## Facts',
    '',
    `- Name: ${person.name}`,
    `- Job title: ${person.jobTitle}`,
    `- Location: ${person.location.en}`,
    `- Email: ${person.email}`,
    `- Website: ${SITE_URL}`,
    `- LinkedIn: ${person.linkedin}`,
    `- GitHub: ${person.github}`,
    `- Languages: ${person.languages.map((l) => l.en).join('; ')}`,
    '',
    '## Pages',
    '',
    `- [Home](${absoluteUrl('en')}): one-line positioning and the live products.`,
    `- [About](${absoluteUrl('en', 'about')}): full experience, education, the TÜBİTAK 2209-A award and the IBM Full Stack certificate.`,
    `- [Work](${absoluteUrl('en', 'projects')}): all projects, with case studies for the three largest.`,
    `- [Writing](${absoluteUrl('en', 'blog')}): notes on backend architecture and deployment.`,
    `- [Contact](${absoluteUrl('en', 'contact')}): email, phone, LinkedIn and GitHub.`,
    '',
    '## Projects',
    '',
    ...projects.map((project) => {
      const where = project.live
        ? `live at ${project.live}`
        : project.github
          ? `source at ${project.github}`
          : 'no public link';
      return `- [${project.title}](${absoluteUrl('en', `projects/${project.slug}`)}): ${project.tagline} (${where})`;
    }),
    '',
    '## Turkish',
    '',
    `A full Turkish translation of this site is available under ${SITE_URL}/tr.`,
    '',
    '## Machine-readable',
    '',
    `- ${SITE_URL}/llms-full.txt — full biography, experience and project descriptions as plain text.`,
    `- ${SITE_URL}/api/resume.json — résumé in the JSON Resume schema.`,
    `- ${SITE_URL}/sitemap.xml`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
