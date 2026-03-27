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

  // ── Skill Details (shown via `cat skill.txt`) ──
  // Add your experience notes for each skill here
  skillDetails: {
    'Python': {
      years: '6+',
      level: '████████░░ 80%',
      note: 'Primary language. ETL pipelines, REST APIs, automation, data processing.',
      used: ['F6', 'Sber', 'Liga Digital Economy'],
    },
    'SQL': {
      years: '6+',
      level: '████████░░ 80%',
      note: 'Complex queries, analytics, stored procedures, data modeling.',
      used: ['Sber', 'Liga Digital Economy'],
    },
    'JS': {
      years: '2+',
      level: '█████░░░░░ 50%',
      note: 'Frontend scripting, Node.js services, tooling.',
      used: ['F6'],
    },
    'Node.js': {
      years: '2+',
      level: '█████░░░░░ 50%',
      note: 'Backend services, API development, microservices.',
      used: ['F6'],
    },
    'FastAPI': {
      years: '3+',
      level: '███████░░░ 70%',
      note: 'High-performance async APIs, data services.',
      used: ['F6', 'Sber'],
    },
    'Django': {
      years: '2+',
      level: '██████░░░░ 60%',
      note: 'Web apps, admin panels, ORM-heavy projects.',
      used: ['Liga Digital Economy'],
    },
    'REST': {
      years: '5+',
      level: '████████░░ 80%',
      note: 'API design, OpenAPI specs, versioning strategies.',
      used: ['F6', 'Sber', 'Liga Digital Economy'],
    },
    'gRPC': {
      years: '1+',
      level: '████░░░░░░ 40%',
      note: 'Microservice communication, protobuf schemas.',
      used: ['F6'],
    },
    'PostgreSQL': {
      years: '5+',
      level: '████████░░ 80%',
      note: 'Primary RDBMS. Partitioning, indexing, query optimization.',
      used: ['F6', 'Sber', 'Liga Digital Economy'],
    },
    'ClickHouse': {
      years: '2+',
      level: '██████░░░░ 60%',
      note: 'Columnar analytics, real-time dashboards, large-scale aggregation.',
      used: ['Sber'],
    },
    'Airflow': {
      years: '3+',
      level: '███████░░░ 70%',
      note: 'DAG orchestration, ETL scheduling, monitoring.',
      used: ['Sber', 'Liga Digital Economy'],
    },
    'dbt': {
      years: '1+',
      level: '████░░░░░░ 40%',
      note: 'Data transformations, testing, documentation.',
      used: ['F6'],
    },
    'Redis': {
      years: '2+',
      level: '█████░░░░░ 50%',
      note: 'Caching, session storage, pub/sub messaging.',
      used: ['F6', 'Sber'],
    },
    'Docker': {
      years: '4+',
      level: '███████░░░ 70%',
      note: 'Containerization, compose stacks, CI/CD images.',
      used: ['F6', 'Sber', 'Liga Digital Economy'],
    },
    'CI/CD': {
      years: '4+',
      level: '███████░░░ 70%',
      note: 'Pipeline design, automated testing, deployment automation.',
      used: ['F6', 'Sber'],
    },
    'Linux': {
      years: '6+',
      level: '████████░░ 80%',
      note: 'Daily driver. Server admin, scripting, debugging.',
      used: ['F6', 'Sber', 'Liga Digital Economy', 'Sber (early)'],
    },
    'Nginx': {
      years: '3+',
      level: '██████░░░░ 60%',
      note: 'Reverse proxy, load balancing, SSL termination.',
      used: ['F6', 'Liga Digital Economy'],
    },
    'GitLab CI': {
      years: '3+',
      level: '██████░░░░ 60%',
      note: 'Pipeline config, runners, auto-deploy.',
      used: ['Sber', 'Liga Digital Economy'],
    },
    'Yandex Cloud': {
      years: '2+',
      level: '█████░░░░░ 50%',
      note: 'Compute, storage, managed databases, serverless.',
      used: ['F6'],
    },
  } as Record<string, { years: string; level: string; note: string; used: string[] }>,

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
