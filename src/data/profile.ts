// ═══════════════════════════════════════════════════════════
//  PROFILE CONFIG — Edit this file to update your CV content
// ═══════════════════════════════════════════════════════════

export const profile = {
  name: 'Evgeny Kim',
  handle: 'evgeny.kim',
  title: 'Senior Developer',
  tagline: [
    'Senior Developer  |  Data Engineer',
    'BI Architect      |  6+ years exp',
  ],
  location: 'Moscow, Russia',
  coordinates: '55.7558° N, 37.6173° E',
  yearsExp: '6+',
  companies: 4,

  // ── About ──
  bio: [
    'Developer with 6+ years of experience building',
    'scalable backend systems, data pipelines, and BI',
    'solutions for enterprise-scale companies.',
  ],
  specialization: [
    'Specializing in Python, SQL',
    'and modern cloud infrastructure.',
  ],

  // ── Contact (add/remove fields freely) ──
  contact: {
    email: 'kimjk1313@gmail.com',
    telegram: '@ZhenyaKim1',
  },

  // ── EmailJS (replace with your real credentials) ──
  emailjs: {
    serviceId: 'service_dbb5vud',
    templateId: 'YOUR_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY',
  },

  // ── Skills (add/remove items freely) ──
  skills: {
    backend: {
      icon: '⚙',
      items: ['Python','SQL', 'JS', 'Node.js', 'FastAPI', 'Django', 'REST', 'gRPC'],
    },
    data: {
      icon: '◆',
      items: ['PostgreSQL', 'ClickHouse', 'Airflow', 'dbt', 'Redis'],
    },
    devops: {
      icon: '▲',
      items: ['Docker', 'CI/CD', 'Linux', 'Nginx', 'GitLab CI'],
    },
    cloud: {
      icon: '☁',
      items: ['Yandex Cloud'],
    },
  },

  // ── Work History (newest first) ──
  jobs: [
    {
      period: '2024 — present',
      role: 'Senior Developer',
      company: 'F6',
      desc: 'Backend architecture, microservices, data platform engineering.',
      tech: ['Python', 'TypeScript', 'Yandex Cloud'],
    },
    {
      period: '2023 — 2024',
      role: 'Data Engineer',
      company: 'Sber',
      desc: 'Built ETL pipelines, real-time analytics, data warehouse solutions.',
      tech: ['Python', 'azkaban', 'ClickHouse'],
    },
    {
      period: '2021 — 2023',
      role: 'BI Developer',
      company: 'Liga Digital Economy',
      desc: 'Designed dashboards, reporting systems, and data models for government analytics.',
      tech: ['Python', 'SQL', 'Luquibase', 'Airflow', 'Greenplum'],
    },
    {
      period: '2019 — 2021',
      role: 'Junior Developer',
      company: 'Sber',
      desc: 'Full-stack development, internal tools, process automation.',
      tech: ['PL/SQL', 'Python', 'Oracle'],
    },
  ],

  // ── Neofetch card ──
  neofetch: {
    os: 'EvgenyOS v1.0',
    role: 'Senior Developer',
    uptime: '6+ years',
    shell: 'bash 5.2',
    langs: 'Python, TS, SQL',
    tools: 'Docker, Airflow',
    location: 'Moscow, RU',
  },
}
