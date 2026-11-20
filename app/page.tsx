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

const skills = [
  { label: 'Python', code: 'async def build():', detail: 'Automation, bots, tooling, APIs, and async systems.' },
  { label: 'Node.js', code: 'await idea.ship()', detail: 'Fast services, real-time apps, and developer tooling.' },
  { label: 'Java', code: 'System.out.println("scale");', detail: 'Structured, dependable, maintainable applications.' },
];

const projectSignals = [
  { number: '01', title: 'Recruitment', detail: 'Role-based acceptance, secure invites, and a persistent application flow.' },
  { number: '02', title: 'Verification', detail: 'Steam and BattleMetrics checks with automated risk signals.' },
  { number: '03', title: 'Scheduling', detail: 'Timezone-aware wipe coordination with interactive responses.' },
  { number: '04', title: 'Live systems', detail: 'Server status panels, durable state, and async-safe updates.' },
];

const focusAreas = [
  {
    n: '01',
    title: 'Authorized security testing',
    detail: 'Assessments performed strictly within an agreed, written scope — nothing beyond what has been signed off.',
  },
  {
    n: '02',
    title: 'Vulnerability research',
    detail: 'Finding, reproducing, and understanding real weaknesses so they can be verified and fixed.',
  },
  {
    n: '03',
    title: 'Responsible disclosure',
    detail: 'Reporting findings privately and in good faith, giving owners the chance to remediate before any exposure.',
  },
  {
    n: '04',
    title: 'Security documentation',
    detail: 'Clear write-ups, reproducible evidence, and practical remediation guidance that teams can act on.',
  },
  {
    n: '05',
    title: 'Confidentiality & ethics',
    detail: 'Operating under formal agreements and a strict professional code. Trust first, always.',
  },
];

type Experience = {
  role: string;
  kind: string;
  org: string;
  period: string;
  tags: string[];
  summary: string;
  points: string[];
  note: string;
};

const experience: Experience[] = [
  {
    role: 'Authorized Ethical Hacking',
    kind: 'Practical experience',
    org: 'De Meerwaarde',
    period: '2026 — Present',
    tags: ['AUTHORIZED', 'IN-SCOPE', 'UNDER NDA'],
    summary:
      'A formal collaboration around authorized ethical hacking activities, carried out strictly within an agreed scope.',
    points: [
      'Authorized security testing',
      'Vulnerability research',
      'Responsible disclosure',
      'Security documentation',
      'Confidentiality and professional ethics',
    ],
    note: 'All activities are conducted under formal authorization and confidentiality agreements.',
  },
];

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(date));
}

export default function Home() {
  const [repos, setRepos] = useState<Repo[]>(fallbackRepos);
  const [profile, setProfile] = useState<Profile>(fallbackProfile);
  const [syncState, setSyncState] = useState<'loading' | 'live' | 'fallback'>('loading');
  const [activeSkill, setActiveSkill] = useState('All');
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
        const publicRepos = data.filter((repo) => !repo.fork);
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
    }, { threshold: .14 });
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
  const visibleRepos = activeSkill === 'All' ? repos : repos.filter((repo) => repo.language === activeSkill);

  return (
    <main id="top">
      <a className="skip-link" href="#work">Skip to projects</a>
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} aria-hidden="true" />
      <div className="ambient" aria-hidden="true" />
      <div className="grid-field" aria-hidden="true" />

      <nav className="nav shell" aria-label="Main navigation">
        <a className="wordmark" href="#top">JINQO<span>/PORTFOLIO</span></a>
        <div className="nav-center" aria-hidden="true"><span /> AVAILABLE FOR NEW WORK</div>
        <div className="nav-links">
          <a href="#experience">Experience</a>
          <a href="#security">Security</a>
          <a href="#work">Work</a>
          <a href="#stack">Stack</a>
          <a href={PROFILE_URL} target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </nav>

      <section className="hero shell">
        <div className="hero-copy-block">
          <p className="overline reveal">DEVELOPER · AUTHORIZED SECURITY · BUILDER</p>
          <h1 className="hero-title" aria-label="Jinqo portfolio">
            <span className="line reveal"><i>JIN</i></span>
            <span className="line outline reveal"><i>QO</i></span>
          </h1>
          <p className="intro reveal">
            I build fast, useful software with <strong>Python</strong>, <strong>Node.js</strong>, and <strong>Java</strong> — and
            I break software the right way through <strong>authorized ethical hacking</strong>, strictly in scope.
          </p>
          <div className="hero-actions reveal">
            <a className="cta cta-primary" href="#work">SEE MY WORK <span>↓</span></a>
            <a className="cta cta-quiet" href="#experience">EXPERIENCE <span>↓</span></a>
          </div>
        </div>

        <div className="identity-card reveal">
          <div className="avatar-wrap">
            <div className="avatar-ring ring-one" aria-hidden="true" />
            <div className="avatar-ring ring-two" aria-hidden="true" />
            <img src={AVATAR_URL} alt="jinqo's GitHub profile avatar" width="360" height="360" />
            <span className="live-badge">ONLINE</span>
          </div>
          <div className="identity-meta">
            <span>@{GITHUB_USER}</span>
            <span>{profile.followers} FOLLOWER{profile.followers === 1 ? '' : 'S'}</span>
          </div>
          <div className="code-note" aria-label="Operating principle">
            <span>01</span><code>while (idea) {'{'}</code>
            <span>02</span><code>&nbsp;&nbsp;build(); secure();</code>
            <span>03</span><code>{'}'}</code>
          </div>
        </div>

        <div className="hero-index" aria-hidden="true">PORTFOLIO — 2026</div>
      </section>

      <div className="ticker" aria-label="Core focus areas">
        <div className="ticker-track">
          <span>PYTHON</span><i>✦</i><span>NODE.JS</span><i>✦</i><span>JAVA</span><i>✦</i><span>ETHICAL HACKING</span><i>✦</i><span>SECURITY</span><i>✦</i><span>AUTOMATION</span><i>✦</i>
          <span>PYTHON</span><i>✦</i><span>NODE.JS</span><i>✦</i><span>JAVA</span><i>✦</i><span>ETHICAL HACKING</span><i>✦</i><span>SECURITY</span><i>✦</i><span>AUTOMATION</span><i>✦</i>
        </div>
      </div>

      <section className="manifesto shell watch" aria-label="About jinqo" data-reveal>
        <p className="section-label">01 / ABOUT</p>
        <p className="manifesto-copy">
          I like software that does real work. <span>Clean interfaces.</span> Reliable systems.
          And I care how it holds up under pressure — so I also test it, responsibly.
        </p>
        <div className="stats-row">
          <div><strong>{String(profile.public_repos).padStart(2, '0')}</strong><span>PUBLIC PROJECTS</span></div>
          <div><strong>02</strong><span>DISCIPLINES</span></div>
          <div><strong>∞</strong><span>ITERATIONS</span></div>
        </div>
      </section>

      <section className="experience shell watch" id="experience" data-reveal>
        <div className="section-head">
          <div><p className="section-label">02 / EXPERIENCE</p><h2>In the field.</h2></div>
          <p className="section-aside">Real engagements, real responsibility. Authorized, in-scope, and documented.</p>
        </div>

        <div className="timeline">
          {experience.map((item) => (
            <article className="xp-card" key={item.role}>
              <div className="xp-rail">
                <span className="xp-dot" aria-hidden="true" />
                <span className="xp-period">{item.period}</span>
                <span className="xp-kind">{item.kind}</span>
              </div>
              <div className="xp-body">
                <div className="xp-tags">
                  {item.tags.map((tag) => (<span key={tag}>{tag}</span>))}
                </div>
                <h3>{item.role}</h3>
                <p className="xp-org">{item.org}</p>
                <p className="xp-summary">{item.summary}</p>
                <ul className="xp-points">
                  {item.points.map((point) => (
                    <li key={point}><span aria-hidden="true">›</span> {point}</li>
                  ))}
                </ul>
                <p className="xp-note">{item.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="security shell watch" id="security" data-reveal>
        <div className="section-head">
          <div><p className="section-label">03 / SECURITY PRACTICE</p><h2>Break it to fix it.</h2></div>
          <p className="section-aside">
            Ethical hacking done the professional way: only with permission, only inside scope, and always
            with the goal of making systems safer.
          </p>
        </div>

        <div className="focus-grid">
          {focusAreas.map((area) => (
            <article className="focus-card" key={area.n}>
              <span className="focus-num">{area.n}</span>
              <h3>{area.title}</h3>
              <p>{area.detail}</p>
            </article>
          ))}
          <article className="focus-card focus-ethos" aria-label="Operating ethos">
            <span className="focus-num">↳</span>
            <h3>Permission first.</h3>
            <p>No scope, no test. Every finding is handled under confidentiality and disclosed responsibly.</p>
          </article>
        </div>
      </section>

      <section className="flagship shell watch" aria-label="Flagship project" data-reveal>
        <div className="flagship-rail">
          <p className="section-label">04 / FLAGSHIP BUILD</p>
          <span>PYTHON / DISCORD / ASYNC</span>
        </div>
        <div className="flagship-intro">
          <div>
            <p className="flagship-kicker">A real tool for a real community</p>
            <h2>Discord<br /><span>Rust Clan Bot</span></h2>
          </div>
          <div className="flagship-summary">
            <p>A production-minded command center that connects two Discord servers, verifies players, coordinates wipes, and keeps clan operations moving.</p>
            <a href="https://github.com/jinqo/discord-rust-clan-bot" target="_blank" rel="noreferrer">EXPLORE THE SOURCE <span>↗</span></a>
          </div>
        </div>
        <div className="signal-grid">
          {projectSignals.map((signal) => (
            <article key={signal.number}>
              <span>{signal.number}</span>
              <h3>{signal.title}</h3>
              <p>{signal.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="work shell watch" id="work" data-reveal>
        <div className="section-head">
          <div><p className="section-label">05 / GITHUB WORK</p><h2>Built in public.</h2></div>
          <div className={`sync ${syncState}`}><span /> {syncState === 'loading' ? 'SYNCING GITHUB' : syncState === 'live' ? 'LIVE FROM GITHUB' : 'GITHUB SNAPSHOT'}</div>
        </div>

        <div className="filters" aria-label="Filter projects by language">
          {languages.map((language) => (
            <button type="button" className={activeSkill === language ? 'active' : ''} onClick={() => setActiveSkill(language)} key={language}>{language}</button>
          ))}
        </div>

        <div className="repo-list">
          {visibleRepos.map((repo, index) => (
            <a className="repo-card" href={repo.html_url} target="_blank" rel="noreferrer" key={repo.id}>
              <div className="repo-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="repo-main">
                <div className="repo-tags"><span>{repo.language || 'Code'}</span><span>UPDATED {formatDate(repo.updated_at)}</span></div>
                <h3>{repo.name.replaceAll('-', ' ')}</h3>
                <p>{repo.description || 'An open-source project by jinqo.'}</p>
              </div>
              <div className="repo-side">
                <span className="repo-arrow" aria-hidden="true">↗</span>
                <div><span>★ {repo.stargazers_count}</span><span>⑂ {repo.forks_count}</span></div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="stack shell watch" id="stack" data-reveal>
        <div className="section-head">
          <div><p className="section-label">06 / CAPABILITIES</p><h2>Tools I think in.</h2></div>
          <p className="section-aside">Different languages, one goal: build the right thing, make it solid, and keep it secure.</p>
        </div>
        <div className="skill-grid">
          {skills.map((skill, index) => (
            <article className="skill-card" key={skill.label}>
              <div className="skill-top"><span>0{index + 1}</span><span className="skill-dot" /></div>
              <h3>{skill.label}</h3>
              <code>{skill.code}</code>
              <p>{skill.detail}</p>
              <div className="skill-bar"><span style={{ width: `${92 - index * 8}%` }} /></div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact shell watch" data-reveal>
        <div className="contact-orbit" aria-hidden="true"><span /></div>
        <p className="section-label">07 / LET&rsquo;S TALK</p>
        <h2>Got a project?<br /><span>Or a system to test?</span></h2>
        <a className="cta cta-primary" href={PROFILE_URL} target="_blank" rel="noreferrer">FIND ME ON GITHUB <span>↗</span></a>
      </section>

      <footer className="footer shell">
        <span>© 2026 JINQO</span>
        <span>DEVELOPMENT · SECURITY</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
