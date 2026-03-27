import { type ReactNode } from 'react'
import { profile } from './data/profile'

export interface Command {
  name: string
  description: string
  execute: (args: string[]) => ReactNode
}

const s = (className: string, children: ReactNode) => (
  <span className={className}>{children}</span>
)

const dim = (text: string) => s('dim', text)
const accent = (text: string) => s('accent', text)
const amber = (text: string) => s('amber', text)
const cyan = (text: string) => s('cyan', text)
const bright = (text: string) => s('bright', text)

const Br = () => <br />

const commands: Command[] = [
  {
    name: 'help',
    description: 'List available commands',
    execute: () => (
      <div className="cmd-output">
        <div>{bright('Available commands:')}</div>
        <Br />
        <div className="cmd-table">
          <div>  {accent('about')}      {dim('—')} Who am I</div>
          <div>  {accent('skills')}     {dim('—')} Technical stack</div>
          <div>  {accent('work')}       {dim('—')} Career timeline</div>
          <div>  {accent('projects')}   {dim('—')} Side projects & repos</div>
          <div>  {accent('contact')}    {dim('—')} Get in touch</div>
          <div>  {accent('clear')}      {dim('—')} Clear terminal</div>
          <div>  {accent('whoami')}     {dim('—')} Quick identity</div>
          <div>  {accent('neofetch')}   {dim('—')} System info</div>
          <div>  {accent('theme')}      {dim('—')} Switch theme {dim('(green|amber|white)')}</div>
          <div>  {accent('sound')}      {dim('—')} Toggle key sounds {dim('(on|off)')}</div>
        </div>
        <Br />
        <div>{dim('Tip: click any')} {cyan('[command]')} {dim('hint to run it.')}</div>
      </div>
    ),
  },
  {
    name: 'about',
    description: 'About me',
    execute: () => (
      <div className="cmd-output">
        <pre className="ascii-small">{`
 ┌──────────────────────────────────────────────────┐
 │              ${profile.name.toUpperCase().padEnd(36)}│
 │              ${profile.title.padEnd(36)}│
 └──────────────────────────────────────────────────┘`}
        </pre>
        <Br />
        {profile.bio.map((line, i) => (
          <div key={i}>{dim('>')} {line}</div>
        ))}
        <Br />
        {profile.specialization.map((line, i) => (
          <div key={i}>{dim('>')} {line}</div>
        ))}
        <Br />
        <div>
          {dim('>')} Based in {cyan(profile.location)} {dim(`(${profile.coordinates})`)}
        </div>
        <Br />
        <div className="stats-row">
          <span>{bright(profile.yearsExp)} {dim('yrs exp')}</span>
          <span>{dim('│')}</span>
          <span>{bright(String(profile.companies))} {dim('companies')}</span>
          <span>{dim('│')}</span>
          <span>{bright('∞')} {dim('curiosity')}</span>
        </div>
        <Br />
        <div>
          {dim('See also:')} {cyan('[skills]')} {cyan('[work]')} {cyan('[contact]')}
        </div>
      </div>
    ),
  },
  {
    name: 'skills',
    description: 'Technical stack',
    execute: (args) => {
      const categories = profile.skills
      const filter = args[0]?.toLowerCase()
      const filtered = filter && categories[filter as keyof typeof categories]
        ? { [filter]: categories[filter as keyof typeof categories] }
        : categories

      if (filter && !categories[filter as keyof typeof categories]) {
        return (
          <div className="cmd-output">
            <div className="error">
              Unknown category: "{filter}"
            </div>
            <div>
              {dim('Available:')} {Object.keys(categories).map((k, i) => (
                <span key={k}>{i > 0 && ' '}{accent(k)}</span>
              ))}
            </div>
            <div>{dim('Usage:')} skills {dim('[category]')}</div>
          </div>
        )
      }

      return (
        <div className="cmd-output">
          {!filter && (
            <div style={{ marginBottom: '4px' }}>
              {dim('Filter:')} skills {dim('<category>')} {dim('│')} {dim('Categories:')} {Object.keys(categories).map((k, i) => (
                <span key={k}>{i > 0 && dim(', ')}{accent(k)}</span>
              ))}
              <Br />
            </div>
          )}
          {Object.entries(filtered).map(([category, { icon, items }]) => (
            <div key={category} style={{ marginBottom: '8px' }}>
              <div>
                {amber(`${icon} ${category.toUpperCase()}`)}
              </div>
              <div className="skills-grid">
                {items.map((skill) => (
                  <span key={skill} className="skill-tag skill-clickable" data-skill={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )
    },
  },
  {
    name: 'work',
    description: 'Career timeline',
    execute: () => (
      <div className="cmd-output">
        <div>{bright('Career Timeline')}</div>
        <div>{dim('─'.repeat(48))}</div>
        <Br />
        {profile.jobs.map((job, i) => (
          <div key={i} className="timeline-entry">
            <div>{amber(job.period)}</div>
            <div>{bright(job.role)} {dim('@')} {cyan(job.company)}</div>
            <div>{dim('  ' + job.desc)}</div>
            <div className="tech-tags">
              {dim('  ')}
              {job.tech.map((t) => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>
            {i < profile.jobs.length - 1 && (
              <div className="timeline-connector">{dim('  │')}</div>
            )}
          </div>
        ))}
      </div>
    ),
  },
  {
    name: 'projects',
    description: 'Side projects',
    execute: () => (
      <div className="cmd-output">
        <pre className="wip-art">{`
    ┌─────────────────────────────────┐
    │                                 │
    │    ░█░█░░▀█▀░▄▀▄░░░░░░░░░░░   │
    │    ░▀▄▀▄░░█░░░█▀░░░░░░░░░░░   │
    │                                 │
    │    WORK  IN  PROGRESS           │
    │                                 │
    │    Building cool stuff...       │
    │    Check back soon.             │
    │                                 │
    └─────────────────────────────────┘`}
        </pre>
        <Br />
        <div>{dim('>')} Projects are currently under development.</div>
        <div>{dim('>')} Stay tuned — will be deployed soon.</div>
        <Br />
        <div>{dim('In the meantime:')} {cyan('[contact]')} {dim('me for collaboration.')}</div>
      </div>
    ),
  },
  {
    name: 'contact',
    description: 'Get in touch',
    execute: () => (
      <div className="cmd-output">
        <div>{bright('Contact')}</div>
        <div>{dim('─'.repeat(36))}</div>
        <Br />
        {Object.entries(profile.contact).map(([key, value]) => (
          <div key={key}>  {dim(key.padEnd(10))} {accent(value)}</div>
        ))}
      </div>
    ),
  },
  {
    name: 'whoami',
    description: 'Quick identity',
    execute: () => (
      <div className="cmd-output">
        <div>A curious visitor with good taste.</div>
      </div>
    ),
  },
  {
    name: 'neofetch',
    description: 'System info',
    execute: () => {
      const n = profile.neofetch
      return (
        <div className="cmd-output">
          <pre className="neofetch">{`
     ██████╗    `}{accent(`${profile.handle}@portfolio`)}{`
    ██╔════╝    `}{dim('──────────────────')}{`
    █████╗      `}{bright('OS:')}{`        ${n.os}
    ██╔══╝      `}{bright('Role:')}{`      ${n.role}
    ███████╗    `}{bright('Uptime:')}{`    ${n.uptime}
    ╚══════╝    `}{bright('Shell:')}{`     ${n.shell}
                `}{bright('Terminal:')}{`  this one :)
     `}{dim('E.KIM')}{`      `}{bright('Langs:')}{`     ${n.langs}
                `}{bright('Tools:')}{`     ${n.tools}
                `}{bright('Location:')}{`  ${n.location}
          `}</pre>
          <div className="color-blocks">
            <span className="color-block bg-red" />
            <span className="color-block bg-green" />
            <span className="color-block bg-amber" />
            <span className="color-block bg-blue" />
            <span className="color-block bg-purple" />
            <span className="color-block bg-cyan" />
          </div>
        </div>
      )
    },
  },
  // ── Easter eggs ──
  {
    name: 'vim',
    description: 'Easter egg',
    execute: () => (
      <div className="cmd-output">
        <div>You've entered vim. Good luck getting out. {dim('(jk, type :q)')}</div>
        <pre className="dim">{`
~
~
~
~                         VIM - Vi IMproved
~
~                          version 9.1
~                      by Bram Moolenaar
~
~              Vim is open source and freely distributable
~
~                     type  :q<Enter>    to exit
~
~`}</pre>
      </div>
    ),
  },
  {
    name: 'exit',
    description: 'Easter egg',
    execute: () => (
      <div className="cmd-output">
        <div>There is no escape. But here's my LinkedIn {amber('->')} {cyan('[contact]')}</div>
      </div>
    ),
  },
  {
    name: 'cowsay',
    description: 'Easter egg',
    execute: (args) => {
      const text = args.length > 0 ? args.join(' ') : 'moo!'
      const border = '─'.repeat(text.length + 2)
      return (
        <div className="cmd-output">
          <pre>{` ┌${border}┐
 │ ${text} │
 └${border}┘
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`}</pre>
        </div>
      )
    },
  },
  {
    name: 'history',
    description: 'Easter egg',
    execute: () => (
      <div className="cmd-output">
        <div>{dim('    1')}  git commit -m "fix: everything"</div>
        <div>{dim('    2')}  stackoverflow "why is my code not working"</div>
        <div>{dim('    3')}  sudo make me a sandwich</div>
        <div>{dim('    4')}  git push --force {dim('# yolo')}</div>
        <div>{dim('    5')}  echo "it works on my machine"</div>
        <div>{dim('    6')}  rm -rf node_modules && npm install {dim('# the classic')}</div>
        <div>{dim('    7')}  curl wttr.in/Moscow</div>
        <div>{dim('    8')}  python -c "import antigravity"</div>
        <div>{dim('    9')}  docker stop $(docker ps -q) {dim('# nuclear option')}</div>
        <div>{dim('   10')}  cat /dev/urandom | hexdump | grep "ca fe"</div>
      </div>
    ),
  },
  {
    name: 'clear',
    description: 'Clear terminal',
    execute: () => null,
  },
]

export const commandMap = new Map(commands.map((c) => [c.name, c]))
export const commandList = commands.filter((c) => c.name !== 'clear')
export default commands
