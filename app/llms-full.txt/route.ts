import { getAllProjects } from '@/lib/content';
import {
  SITE_URL,
  absoluteUrl,
  atAGlance,
  award,
  certificate,
  education,
  experience,
  person,
  skills,
  tagline,
} from '@/lib/site';

export const dynamic = 'force-static';

/**
 * The whole site as plain text: biography, every role, every project
 * description. Written so a model that reads only this file still has the
 * complete, correctly-attributed picture — same names, same dates, same
 * wording as the rendered pages.
 */
export function GET() {
  const projects = getAllProjects('en');
  const lines: string[] = [];

  lines.push(
    `# ${person.name} — ${person.jobTitle}`,
    '',
    tagline.en,
    '',
    '## Summary',
    '',
    atAGlance.en,
    '',
    '## Contact and identity',
    '',
    `Name: ${person.name}`,
    `Job title: ${person.jobTitle}`,
    `Location: ${person.location.en}`,
    `Relocation: ${person.relocation.en}`,
    `Email: ${person.email}`,
    `Phone: ${person.phone}`,
    `Website: ${SITE_URL}`,
    `LinkedIn: ${person.linkedin}`,
    `GitHub: ${person.github}`,
    `Spoken languages: ${person.languages.map((l) => l.en).join('; ')}`,
    '',
    '## Experience',
    '',
  );

  for (const job of experience) {
    lines.push(
      `### ${job.role} — ${job.company}`,
      `${job.location.en} · ${job.start} – ${job.end ?? 'present'}`,
      '',
    );
    if (job.summary) lines.push(job.summary.en, '');
    for (const bullet of job.bullets) lines.push(`- ${bullet.en}`);
    lines.push('');
  }

  lines.push('## Projects', '');

  for (const project of projects) {
    lines.push(
      `### ${project.title}`,
      '',
      project.summary,
      '',
      `Role: ${project.role}`,
      ...(project.period ? [`Period: ${project.period}`] : []),
      `Status: ${project.status}`,
      `Tech stack: ${project.stack.join(', ')}`,
      project.live ? `Live: ${project.live}` : 'Live: no public link',
      ...(project.github ? [`Source: ${project.github}`] : []),
      `Page: ${absoluteUrl('en', `projects/${project.slug}`)}`,
      '',
      // The case-study prose, stripped of MDX heading markers.
      project.body
        .replace(/^##\s+/gm, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\*\*/g, '')
        .replace(/`/g, '')
        .trim(),
      '',
    );
  }

  lines.push(
    '## Education',
    '',
    `${education.degree.en} — ${education.institution.en}, ${education.location.en} (${education.start} – ${education.end})`,
    education.note.en,
    '',
    '## Award',
    '',
    `${award.name} — "${award.project.en}" (${award.period.en})`,
    '',
    award.description.en,
    `Project repository: ${award.url}`,
    '',
    '## Certificate',
    '',
    `${certificate.name} — ${certificate.issuer} ${certificate.type.en}, ${certificate.date.en}`,
    certificate.description.en,
    `Verification: ${certificate.url}`,
    '',
    '## Technical skills',
    '',
  );

  for (const group of skills) {
    lines.push(`${group.label.en}: ${group.items.join(', ')}`);
  }

  lines.push(
    '',
    '## Notes',
    '',
    `A full Turkish translation of this site is available under ${SITE_URL}/tr.`,
    `A machine-readable résumé in the JSON Resume schema is at ${SITE_URL}/api/resume.json.`,
    '',
  );

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
