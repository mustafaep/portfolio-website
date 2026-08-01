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
} from '@/lib/site';

export const dynamic = 'force-static';

/**
 * Résumé in the JSON Resume schema (https://jsonresume.org/schema/).
 *
 * A standard schema rather than a bespoke one: a consumer that already knows
 * JSON Resume can read this without being told anything about the site.
 */
export function GET() {
  const projects = getAllProjects('en');

  const resume = {
    $schema:
      'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: person.name,
      label: person.jobTitle,
      email: person.email,
      phone: person.phone,
      url: SITE_URL,
      summary: atAGlance.en,
      location: {
        city: person.location.city,
        countryCode: person.location.countryCode,
        region: person.location.country,
      },
      profiles: [
        {
          network: 'LinkedIn',
          username: 'mustafa-erhan-portakal',
          url: person.linkedin,
        },
        { network: 'GitHub', username: 'mustafaep', url: person.github },
      ],
    },
    work: experience.map((job) => ({
      name: job.company,
      position: job.role,
      location: job.location.en,
      startDate: job.startISO,
      ...(job.endISO ? { endDate: job.endISO } : {}),
      summary: job.summary?.en,
      highlights: job.bullets.map((bullet) => bullet.en),
    })),
    education: [
      {
        institution: education.institution.en,
        area: 'Computer Engineering',
        studyType: 'BSc',
        startDate: education.start,
        endDate: education.end,
      },
    ],
    awards: [
      {
        title: `${award.name} — ${award.project.en}`,
        awarder: 'TÜBİTAK',
        summary: award.description.en,
        url: award.url,
      },
    ],
    certificates: [
      {
        name: certificate.name,
        issuer: certificate.issuer,
        date: certificate.dateISO,
        url: certificate.url,
      },
    ],
    skills: skills.map((group) => ({
      name: group.label.en,
      keywords: [...group.items],
    })),
    languages: [
      { language: 'Turkish', fluency: 'Native speaker' },
      { language: 'English', fluency: 'B2 reading and writing, B1 speaking' },
    ],
    projects: projects.map((project) => ({
      name: project.title,
      description: project.summary,
      ...(project.period ? { startDate: project.period } : {}),
      highlights: [project.status],
      keywords: project.stack,
      url: project.live ?? project.github ?? absoluteUrl('en', `projects/${project.slug}`),
      roles: [project.role],
    })),
    meta: {
      canonical: `${SITE_URL}/api/resume.json`,
      version: '1.0.0',
    },
  };

  return Response.json(resume, {
    headers: { 'Cache-Control': 'public, max-age=3600' },
  });
}
