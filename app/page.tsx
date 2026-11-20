'use client';

import { useEffect, useMemo, useState } from 'react';

const GITHUB_USER = 'jinqo';
const PROFILE_URL = `https://github.com/${GITHUB_USER}`;
const AVATAR_URL = 'https://avatars.githubusercontent.com/u/160657813?v=4';

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
};

type Profile = {
  public_repos: number;
  followers: number;
  following: number;
};

const fallbackProfile: Profile = { public_repos: 1, followers: 1, following: 2 };

const fallbackRepos: Repo[] = [
  {
    id: 1,
    name: 'discord-rust-clan-bot',
    html_url: 'https://github.com/jinqo/discord-rust-clan-bot',
    description:
      'A production-minded Discord bot for Rust clans: recruitment, Steam verification, scheduling, persistent UI, and live server monitoring.',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-01-01T00:00:00Z',
    fork: false,
  },
];

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

type Experience = {
  role: string;
  context: string;
  period: string;
  tags: string[];
  summary: string;
  points: string[];
  note?: string;
};

const experience: Experience[] = [
  {
    role: 'Authorized Security Research',
    context: 'De Meerwaarde · Formal agreement with my school',
    period: '2026 — Present',
    tags: ['AUTHORIZED', 'DEFINED SCOPE', 'UNDER NDA'],
    summary:
      'I signed a formal confidentiality and authorization agreement with my school that permits ethical hacking activities within an agreed scope. The agreement sets out how security research is conducted, what is in and out of bounds, and how findings are handled.',
    points: [
      'Confidentiality obligations (NDA)',
      'Authorization limited to an agreed scope',
      'Rules for responsible security research',
      'Clear responsibilities and boundaries',
    ],
    note: 'Details of systems, scope and findings are confidential and are intentionally not published here.',
  },
  {
    role: 'Independent Security Engineering',
    context: 'Self-directed · Sentinel Anticheat for FiveM',
    period: 'Ongoing',
    tags: ['SERVER-SIDE', 'DETECTION', 'LUA'],
    summary:
      'Designing and building a custom server-side anticheat: detection logic, event validation, evidence collection, and moderation workflows — with an observe-only mode to measure false positives before anything is enforced.',
    points: [
      'Server-side security architecture',
      'Detection policy and registry design',
      'Evidence timelines for review',
      'False-positive reduction',
    ],
  },
  {
    role: 'Infrastructure & Systems Administration',
    context: 'Self-directed · Personal Debian 13 server',
    period: 'Ongoing',
    tags: ['LINUX', 'DOCKER', 'SELF-HOSTED'],
    summary:
      'Operating and maintaining my own Debian server remotely over SSH. I run and troubleshoot self-hosted services, manage containers, and use the machine as a hands-on lab for networking, monitoring and remote access.',
    points: [
      'Linux administration over SSH',
      'Docker and service management',
      'Networking and troubleshooting',
      'Resource and power optimization',
    ],
  },
];

const principles = [
  { n: '01', title: 'Scope first', detail: 'Only what is explicitly authorized. No scope, no test.' },
  { n: '02', title: 'Confidentiality', detail: 'What I see under agreement stays under agreement.' },
  { n: '03', title: 'Responsible disclosure', detail: 'Findings go privately to the owner so they can be fixed.' },
  { n: '04', title: 'Documentation', detail: 'Clear, reproducible notes that someone else can act on.' },
];

type Status = 'In development' | 'Operational' | 'Published' | 'Ongoing';

type Project = {
  id: string;
  title: string;
  kicker: string;
  status: Status;
  summary: string;
  highlights: string[];
  stack: string[];
  link?: { href: string; label: string };
  featured?: boolean;
};

const projects: Project[] = [
  {
    id: 'sentinel',
    title: 'Sentinel Anticheat',
    kicker: 'Security engineering · FiveM',
    status: 'In development',
    featured: true,
    summary:
      'A custom server-side anticheat for FiveM servers, built on one rule: the client is untrusted. Security-relevant actions are validated on the server, recorded as evidence, and reviewed before enforcement — and new detections run in observe-only DryRun mode first, so false positives are caught before they affect real players.',
    highlights: [
      'Movement and teleport detection',
      'Weapon and fire-rate validation',
      'Event validation and rate limiting',
      'Detection policy and registry system',
      'Evidence collection with timelines',
      'False-positive reduction',
      'Observe-only / DryRun testing',
      'Discord moderation and ticket integration',
      'AI-assisted analysis of detections',
    ],
    stack: ['Lua', 'FiveM', 'ox_inventory', 'Cloudflare Workers AI', 'Discord'],
  },
  {
    id: 'openbots',
    title: 'OpenBots',
    kicker: 'Personal AI infrastructure',
    status: 'In development',
    summary:
      'A personal AI platform self-hosted on my Debian server: a multi-agent architecture with a routing layer that sends requests to the right model or API, managed through an installable PWA dashboard.',
    highlights: [
      'Multi-agent architecture',
      'AI model and API routing',
      'PWA dashboard',
      'Connector integrations',
      'Voice interaction research',
      'Automation and service management',
    ],
    stack: ['Debian', 'AI model APIs', 'PWA', 'Automation'],
  },
  {
    id: 'homelab',
    title: 'Debian Homelab',
    kicker: 'Infrastructure & self-hosting',
    status: 'Operational',
    summary:
      'My personal Debian 13 server, administered remotely and running self-hosted services. It is where I practise Linux, networking, monitoring and remote access on a real system that has to stay up.',
    highlights: [
      'Pi-hole — network-wide DNS filtering',
      'Jellyfin — media server',
      'Crafty Controller — game servers',
      'Uptime Kuma — service monitoring',
      'Tailscale — remote-access research',
      'Resource and power optimization',
    ],
    stack: ['Debian 13', 'SSH', 'Docker', 'Networking', 'Tailscale'],
  },
  {
    id: 'discord-bot',
    title: 'Discord Rust Clan Bot',
    kicker: 'Community tooling · Python',
    status: 'Published',
    summary:
      'A production-minded command center that connects two Discord servers, verifies players, coordinates wipes, and keeps clan operations moving.',
    highlights: [
      'Role-based recruitment flow',
      'Steam and BattleMetrics verification',
      'Timezone-aware scheduling',
      'Live server status panels',
    ],
    stack: ['Python', 'discord.py', 'Async', 'REST APIs'],
    link: { href: 'https://github.com/jinqo/discord-rust-clan-bot', label: 'View source' },
  },
  {
    id: 'roblox',
    title: 'Hollow Fang & ABYSSBOUND',
    kicker: 'Game development · Roblox',
    status: 'Ongoing',
    summary:
      'Roblox game projects where I build gameplay systems end to end — combat logic split cleanly between server and client, procedurally generated environments, and the asset pipeline behind them.',
    highlights: [
      'Gameplay and combat systems',
      'Server/client architecture',
      'Procedural environment generation',
      'Rojo-based workflow',
      'Blender, VFX and asset pipelines',
    ],
    stack: ['Luau', 'Roblox', 'Rojo', 'Blender'],
  },
];

const skillGroups = [
  {
    title: 'Languages',
    items: ['Python', 'Lua', 'Luau', 'JavaScript / Node.js', 'Java'],
  },
  {
    title: 'Security',
    items: [
      'Server-side validation',
      'Event validation',
      'Rate limiting',
      'Detection engineering',
      'Evidence & timelines',
      'False-positive tuning',
      'Responsible disclosure',
    ],
  },
  {
    title: 'Infrastructure',
    items: ['Debian / Linux', 'SSH', 'Docker', 'Networking', 'Tailscale', 'Cloudflare Workers', 'Self-hosting'],
  },
  {
    title: 'Tools & Platforms',
    items: ['Git & GitHub', 'Discord API', 'FiveM', 'ox_inventory', 'Rojo', 'Blender', 'Uptime Kuma', 'Pi-hole'],
  },
];

const learning = [
  {
    area: 'Authorized security research',
    source: 'School agreement',
    detail:
      'Learning to work within a defined scope, keep proper notes, and handle findings responsibly under a formal confidentiality and authorization agreement.',
  },
  {
    area: 'Detection engineering',
    source: 'Sentinel',
    detail:
      'Designing detections, tuning thresholds, reducing false positives, and validating rules in observe-only mode before they are allowed to act.',
  },
  {
    area: 'Linux & networking',
    source: 'Homelab',
    detail:
      'Administering a real Debian server: services, containers, DNS, monitoring, remote access, and troubleshooting when things break.',
  },
  {
    area: 'AI systems & architecture',
    source: 'OpenBots',
    detail:
      'Exploring multi-agent design, API routing, and how to integrate AI models into self-hosted infrastructure safely.',
  },
];

const achievements = [
  {
    label: '2026',
    title: 'Formal ethical hacking authorization',
    detail: 'Signed a confidentiality and authorization agreement with my school defining scope, rules and responsibilities for security research.',
  },
  {
    label: 'Public',
    title: 'Open-source Discord bot',
    detail: 'Published a production-minded Discord bot with recruitment, verification and live monitoring — source available on GitHub.',
    href: 'https://github.com/jinqo/discord-rust-clan-bot',
  },
  {
    label: 'Running',
    title: 'Self-hosted Debian server',
    detail: 'Built and maintain a Debian 13 server running multiple self-hosted services, administered remotely.',
  },
];

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(date));
}

function statusClass(status: Status) {
  return status === 'In development' ? 'status status-dev' : status === 'Ongoing' ? 'status status-ongoing' : 'status status-live';
}

export default function Home() {
  const [repos, setRepos] = useState<Repo[]>(fallbackRepos);
  const [profile, setProfile] = useState<Profile>(fallbackProfile);
  const [syncState, setSyncState] = useState<'loading' | 'live' | 'fallback'>('loading');
  const [activeLanguage, setActiveLanguage] = useState('All');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`, { signal: controller.signal }),
      fetch(`https://api.github.com/users/${GITHUB_USER}`, { signal: controller.signal }),
    ])
      .then(async ([reposResponse, profileResponse]) => {
        if (!reposResponse.ok || !profileResponse.ok) throw new Error('GitHub request failed');
        return [await reposResponse.json() as Repo[], await profileResponse.json() as Profile] as const;
      })
      .then(([data, profileData]) => {
        const publicRepos = data.filter((repo) => !repo.fork && repo.name.toLowerCase() !== `${GITHUB_USER}.github.io`);
        if (publicRepos.length) setRepos(publicRepos);
        setProfile(profileData);
        setSyncState('live');
      })
      .catch((error: Error) => {
        if (error.name !== 'AbortError') setSyncState('fallback');
      });

    const handlePointer = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
    };
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .08 });
    document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element));
    window.addEventListener('pointermove', handlePointer, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      controller.abort();
      window.removeEventListener('pointermove', handlePointer);
      window.removeEventListener('scroll', handleScroll);
      revealObserver.disconnect();
    };
  }, []);

  const languages = useMemo(
    () => ['All', ...Array.from(new Set(repos.map((repo) => repo.language).filter(Boolean) as string[]))],
    [repos],
  );
  const visibleRepos = activeLanguage === 'All' ? repos : repos.filter((repo) => repo.language === activeLanguage);

  return (
    <main id="top">
      <a className="skip-link" href="#projects">Skip to projects</a>
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} aria-hidden="true" />
      <div className="ambient" aria-hidden="true" />
      <div className="grid-field" aria-hidden="true" />

      <nav className="nav shell" aria-label="Main navigation">
        <a className="wordmark" href="#top">JINQO<span>/SEC·DEV</span></a>
        <div className="nav-center" aria-hidden="true"><span /> OPEN TO OPPORTUNITIES</div>
        <div className="nav-links">
          <a className="nav-hide-sm" href="#about">About</a>
          <a className="nav-hide-sm" href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a className="nav-hide-sm" href="#skills">Skills</a>
          <a href={PROFILE_URL} target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero shell">
        <div className="hero-copy-block">
          <p className="overline reveal">SECURITY ENGINEERING · SOFTWARE · INFRASTRUCTURE</p>
          <h1 className="hero-title" aria-label="Jinqo">
            <span className="line reveal"><i>JIN</i></span>
            <span className="line outline reveal"><i>QO</i></span>
          </h1>
          <p className="intro reveal">
            Aspiring security engineer. I build <strong>server-side security systems</strong>, run my own{' '}
            <strong>Linux infrastructure</strong>, and write software in Python, Lua and Node.js — and I do{' '}
            <strong>authorized security research</strong> under a formal agreement with my school.
          </p>
          <div className="hero-actions reveal">
            <a className="cta cta-primary" href="#projects">VIEW PROJECTS <span>↓</span></a>
            <a className="cta cta-quiet" href="#experience">EXPERIENCE <span>↓</span></a>
          </div>
        </div>

        <div className="identity-card reveal">
          <div className="avatar-wrap">
            <div className="avatar-ring ring-one" aria-hidden="true" />
            <div className="avatar-ring ring-two" aria-hidden="true" />
            <img src={AVATAR_URL} alt="jinqo's GitHub profile avatar" width="360" height="360" />
            <span className="live-badge">BUILDING</span>
          </div>
          <div className="identity-meta">
            <span>@{GITHUB_USER}</span>
            <span>{profile.public_repos} PUBLIC REPO{profile.public_repos === 1 ? '' : 'S'}</span>
          </div>
          <div className="code-note" aria-label="Operating principle">
            <span>01</span><code>if (!authorized(scope)) return;</code>
            <span>02</span><code>validate(event); log(evidence);</code>
            <span>03</span><code>build(); secure(); repeat();</code>
          </div>
        </div>

        <div className="hero-index" aria-hidden="true">PORTFOLIO — 2026</div>
      </section>

      <div className="ticker" aria-label="Focus areas">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <span className="ticker-set" key={copy} aria-hidden={copy === 1}>
              <span>SECURITY ENGINEERING</span><i>✦</i><span>DETECTION</span><i>✦</i><span>LINUX</span><i>✦</i>
              <span>PYTHON</span><i>✦</i><span>LUA</span><i>✦</i><span>SELF-HOSTING</span><i>✦</i><span>AUTOMATION</span><i>✦</i>
            </span>
          ))}
        </div>
      </div>

      {/* 01 ABOUT */}
      <section className="manifesto shell watch" id="about" data-reveal>
        <p className="section-label">01 / ABOUT</p>
        <p className="manifesto-copy">
          I build things, then <span>try to break them.</span> Understanding how systems fail is how I learn to make them hold.
        </p>
        <div className="about-grid">
          <div>
            <h3>Where I come from</h3>
            <p>
              I started out building software that real communities use — Discord tooling, game systems, automation. Running
              those projects taught me that the interesting problems are rarely the features; they are abuse, edge cases,
              and the things users are not supposed to do.
            </p>
          </div>
          <div>
            <h3>What I focus on</h3>
            <p>
              Server-side security, detection engineering, and the infrastructure underneath it. I run my own Debian server,
              build an anticheat from the ground up, and take part in authorized security research within a clearly defined scope.
            </p>
          </div>
          <div>
            <h3>Where I am heading</h3>
            <p>
              A career in security engineering. I am building that foundation the practical way: real systems, real
              constraints, written agreements, and honest documentation of what I have and have not done.
            </p>
          </div>
        </div>
        <div className="stats-row">
          <div><strong>{String(profile.public_repos).padStart(2, '0')}</strong><span>PUBLIC REPOSITORIES</span></div>
          <div><strong>{String(projects.length).padStart(2, '0')}</strong><span>FEATURED PROJECTS</span></div>
          <div><strong>03</strong><span>DISCIPLINES · SEC / DEV / INFRA</span></div>
        </div>
      </section>

      {/* 02 EXPERIENCE */}
      <section className="experience shell watch" id="experience" data-reveal>
        <div className="section-head">
          <div><p className="section-label">02 / EXPERIENCE</p><h2>Hands-on, on record.</h2></div>
          <p className="section-aside">
            Authorized security research, independent security engineering, and the infrastructure I run myself.
            No inflated titles — this is what I actually do.
          </p>
        </div>

        <div className="timeline">
          {experience.map((item) => (
            <article className="xp-card" key={item.role}>
              <div className="xp-rail">
                <span className="xp-dot" aria-hidden="true" />
                <span className="xp-period">{item.period}</span>
                <span className="xp-kind">{item.context}</span>
              </div>
              <div className="xp-body">
                <div className="xp-tags">
                  {item.tags.map((tag) => (<span key={tag}>{tag}</span>))}
                </div>
                <h3>{item.role}</h3>
                <p className="xp-summary">{item.summary}</p>
                <ul className="xp-points">
                  {item.points.map((point) => (
                    <li key={point}><span aria-hidden="true">›</span> {point}</li>
                  ))}
                </ul>
                {item.note && <p className="xp-note">{item.note}</p>}
              </div>
            </article>
          ))}
        </div>

        <div className="principles" aria-label="How I approach security work">
          <p className="principles-label">HOW I APPROACH SECURITY WORK</p>
          <div className="principles-grid">
            {principles.map((p) => (
              <article key={p.n}>
                <span>{p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 03 PROJECTS */}
      <section className="projects shell watch" id="projects" data-reveal>
        <div className="section-head">
          <div><p className="section-label">03 / PROJECTS</p><h2>Selected work.</h2></div>
          <p className="section-aside">
            Each project is labelled with its real status. Source for private projects is not public; the live list
            below shows everything that is.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article className={`project-card${project.featured ? ' featured' : ''}`} key={project.id}>
              <div className="project-top">
                <span className="project-kicker">{project.kicker}</span>
                <span className={statusClass(project.status)}>{project.status}</span>
              </div>
              <div className="project-body">
                <div className="project-main">
                  <h3>{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                </div>
                <ul className="project-highlights">
                  {project.highlights.map((h) => (
                    <li key={h}><span aria-hidden="true">›</span>{h}</li>
                  ))}
                </ul>
              </div>
              <div className="project-foot">
                <div className="project-stack">
                  {project.stack.map((s) => (<span key={s}>{s}</span>))}
                </div>
                {project.link ? (
                  <a className="project-link" href={project.link.href} target="_blank" rel="noreferrer">
                    {project.link.label} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="project-private">Private source</span>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="repos-block">
          <div className="repos-head">
            <h3>Public repositories</h3>
            <div className={`sync ${syncState}`}><span /> {syncState === 'loading' ? 'SYNCING GITHUB' : syncState === 'live' ? 'LIVE FROM GITHUB' : 'GITHUB SNAPSHOT'}</div>
          </div>

          {languages.length > 2 && (
            <div className="filters" aria-label="Filter repositories by language">
              {languages.map((language) => (
                <button type="button" className={activeLanguage === language ? 'active' : ''} onClick={() => setActiveLanguage(language)} key={language}>{language}</button>
              ))}
            </div>
          )}

          <div className="repo-list">
            {visibleRepos.map((repo, index) => (
              <a className="repo-card" href={repo.html_url} target="_blank" rel="noreferrer" key={repo.id}>
                <div className="repo-number">{String(index + 1).padStart(2, '0')}</div>
                <div className="repo-main">
                  <div className="repo-tags"><span>{repo.language || 'Code'}</span><span>UPDATED {formatDate(repo.updated_at)}</span></div>
                  <h4>{repo.name.replaceAll('-', ' ')}</h4>
                  <p>{repo.description || 'An open-source project by jinqo.'}</p>
                </div>
                <div className="repo-side">
                  <span className="repo-arrow" aria-hidden="true">↗</span>
                  <div><span>★ {repo.stargazers_count}</span><span>⑂ {repo.forks_count}</span></div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 04 SKILLS */}
      <section className="skills shell watch" id="skills" data-reveal>
        <div className="section-head">
          <div><p className="section-label">04 / TECHNICAL SKILLS</p><h2>Toolkit.</h2></div>
          <p className="section-aside">Grouped by discipline. Everything listed here is used in the projects above.</p>
        </div>
        <div className="skill-cats">
          {skillGroups.map((group, index) => (
            <article className="skill-cat" key={group.title}>
              <div className="skill-cat-top"><span>0{index + 1}</span><span className="skill-dot" /></div>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (<li key={item}>{item}</li>))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* 05 LEARNING */}
      <section className="learning shell watch" id="learning" data-reveal>
        <div className="section-head">
          <div><p className="section-label">05 / LEARNING &amp; DEVELOPMENT</p><h2>Always in progress.</h2></div>
          <p className="section-aside">How I am building my cybersecurity foundation — through practice, not just theory.</p>
        </div>
        <div className="learning-list">
          {learning.map((item) => (
            <article className="learning-row" key={item.area}>
              <div className="learning-meta">
                <span className="learning-now">NOW</span>
                <span className="learning-source">via {item.source}</span>
              </div>
              <h3>{item.area}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
        <p className="learning-note">
          I do not hold a cybersecurity certification yet. Everything above is hands-on, self-directed, or done
          under my school&rsquo;s formal authorization.
        </p>
      </section>

      {/* 06 ACHIEVEMENTS */}
      <section className="achievements shell watch" id="achievements" data-reveal>
        <div className="section-head">
          <div><p className="section-label">06 / ACHIEVEMENTS</p><h2>Milestones.</h2></div>
          <p className="section-aside">Only things that are real and verifiable.</p>
        </div>
        <div className="achievement-grid">
          {achievements.map((a) => {
            const inner = (
              <>
                <span className="achievement-label">{a.label}</span>
                <h3>{a.title}{a.href && <span aria-hidden="true"> ↗</span>}</h3>
                <p>{a.detail}</p>
              </>
            );
            return a.href ? (
              <a className="achievement" href={a.href} target="_blank" rel="noreferrer" key={a.title}>{inner}</a>
            ) : (
              <article className="achievement" key={a.title}>{inner}</article>
            );
          })}
        </div>
      </section>

      {/* 07 CONTACT */}
      <section className="contact shell watch" id="contact" data-reveal>
        <div className="contact-orbit" aria-hidden="true"><span /></div>
        <p className="section-label">07 / CONTACT</p>
        <h2>Let&rsquo;s talk<br /><span>security &amp; code.</span></h2>
        <p className="contact-copy">
          Interested in my work, an internship, or a project? The best way to reach me is through GitHub.
        </p>
        <a className="cta cta-primary" href={PROFILE_URL} target="_blank" rel="noreferrer">GITHUB @{GITHUB_USER} <span>↗</span></a>
      </section>

      <footer className="footer shell">
        <span>© 2026 JINQO</span>
        <span>SECURITY · SOFTWARE · INFRASTRUCTURE</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
