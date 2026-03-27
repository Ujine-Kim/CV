import { useState, useRef, useEffect, useCallback, type ReactNode, type KeyboardEvent } from 'react'
import { commandMap } from '../commands'
import { profile } from '../data/profile'

interface OutputLine {
  id: string
  content: ReactNode
  type: 'input' | 'output' | 'system' | 'boot'
}

const PROMPT = 'visitor@evgeny.kim:~$ '

const BOOT_SEQUENCE = [
  { text: '[BOOT] Initializing EvgenyOS v1.0...', delay: 0 },
  { text: '[OK] Core modules loaded', delay: 400 },
  { text: '[OK] Profile: evgeny.kim', delay: 250 },
  { text: '[OK] Network interface up', delay: 300 },
  { text: '[OK] Session established', delay: 200 },
  { text: '', delay: 100 },
]

const HINT_COMMANDS = ['about', 'skills', 'work', 'projects', 'contact', 'help']

let lineId = 0
const nextId = () => `line-${++lineId}`

// Matrix rain component for "hack" easter egg
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 600
    canvas.height = 200
    const cols = Math.floor(canvas.width / 14)
    const drops: number[] = Array(cols).fill(1)
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF'

    let frame = 0
    const maxFrames = 150 // ~5 seconds at 30fps

    const interval = setInterval(() => {
      ctx.fillStyle = 'rgba(2, 10, 2, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#33ff33'
      ctx.font = '14px monospace'

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillStyle = Math.random() > 0.9 ? '#66ff66' : '#33ff33'
        ctx.fillText(char, i * 14, drops[i] * 14)
        if (drops[i] * 14 > canvas.height && Math.random() > 0.95) drops[i] = 0
        drops[i]++
      }

      frame++
      if (frame >= maxFrames) {
        clearInterval(interval)
        ctx.fillStyle = 'rgba(2, 10, 2, 0.8)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#33ff33'
        ctx.font = '16px monospace'
        ctx.fillText('ACCESS GRANTED. Welcome, hacker.', 20, 110)
      }
    }, 33)

    return () => clearInterval(interval)
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', maxWidth: 600, height: 200, borderRadius: 4 }} />
}

// Keyboard click sound via Web Audio API
const audioCtx = typeof window !== 'undefined' ? new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)() : null

function playClick() {
  if (!audioCtx) return
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  osc.connect(gain)
  gain.connect(audioCtx.destination)
  osc.frequency.value = 800 + Math.random() * 400
  osc.type = 'square'
  gain.gain.setValueAtTime(0.03, audioCtx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05)
  osc.start(audioCtx.currentTime)
  osc.stop(audioCtx.currentTime + 0.05)
}

// Theme definitions
const THEMES: Record<string, { phosphor: string; dim: string; bright: string; glow: string; glowStrong: string; white: string }> = {
  green: {
    phosphor: '#33ff33', dim: '#1a9e1a', bright: '#66ff66',
    glow: 'rgba(51, 255, 51, 0.15)', glowStrong: 'rgba(51, 255, 51, 0.35)',
    white: '#ccffcc',
  },
  amber: {
    phosphor: '#ffb000', dim: '#996a00', bright: '#ffd000',
    glow: 'rgba(255, 176, 0, 0.15)', glowStrong: 'rgba(255, 176, 0, 0.35)',
    white: '#fff0cc',
  },
  white: {
    phosphor: '#cccccc', dim: '#666666', bright: '#ffffff',
    glow: 'rgba(255, 255, 255, 0.1)', glowStrong: 'rgba(255, 255, 255, 0.25)',
    white: '#eeeeee',
  },
}

function applyTheme(name: string) {
  const t = THEMES[name]
  if (!t) return false
  const r = document.documentElement.style
  r.setProperty('--phosphor', t.phosphor)
  r.setProperty('--phosphor-dim', t.dim)
  r.setProperty('--phosphor-bright', t.bright)
  r.setProperty('--phosphor-glow', t.glow)
  r.setProperty('--phosphor-glow-strong', t.glowStrong)
  r.setProperty('--white', t.white)
  return true
}

export default function Terminal() {
  const [lines, setLines] = useState<OutputLine[]>([])
  const [input, setInput] = useState('')
  const [isBooting, setIsBooting] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [soundEnabled, setSoundEnabled] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  // Auto-scroll
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (bodyRef.current) {
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight
      }
    })
  }, [])

  // Boot sequence
  useEffect(() => {
    const bootLines: OutputLine[] = []
    const timers: ReturnType<typeof setTimeout>[] = []
    let cumDelay = 300

    BOOT_SEQUENCE.forEach((step) => {
      cumDelay += step.delay
      const t = setTimeout(() => {
        bootLines.push({ id: nextId(), content: step.text, type: 'boot' })
        setLines([...bootLines])
        scrollToBottom()
      }, cumDelay)
      timers.push(t)
    })

    // After boot, show welcome
    const welcomeDelay = cumDelay + 500
    timers.push(
      setTimeout(() => {
        setIsBooting(false)
        setShowContent(true)
        setLines((prev) => [
          ...prev,
          { id: nextId(), type: 'system', content: '' },
          {
            id: nextId(),
            type: 'system',
            content: (
              <pre className="ascii-welcome">{`
  ███████╗   ██╗  ██╗██╗███╗   ███╗
  ██╔════╝   ██║ ██╔╝██║████╗ ████║
  █████╗     █████╔╝ ██║██╔████╔██║
  ██╔══╝     ██╔═██╗ ██║██║╚██╔╝██║
  ███████╗██╗██║  ██╗██║██║ ╚═╝ ██║
  ╚══════╝╚═╝╚═╝  ╚═╝╚═╝╚═╝    ╚═╝

  ${profile.tagline[0]}
  ${profile.tagline[1]}
`}</pre>
            ),
          },
          { id: nextId(), type: 'system', content: '' },
          {
            id: nextId(),
            type: 'system',
            content: (
              <span>
                <span className="dim">Type </span>
                <span className="accent">help</span>
                <span className="dim"> or click a command below.</span>
              </span>
            ),
          },
          { id: nextId(), type: 'system', content: '' },
        ])
        scrollToBottom()
        setTimeout(() => inputRef.current?.focus(), 100)
      }, welcomeDelay)
    )

    return () => timers.forEach(clearTimeout)
  }, [scrollToBottom])

  // Execute command
  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase()
      const [name, ...args] = trimmed.split(/\s+/)

      // Add input line
      const newLines: OutputLine[] = [
        { id: nextId(), type: 'input', content: cmd.trim() },
      ]

      if (!name) {
        setLines((prev) => [...prev, ...newLines])
        scrollToBottom()
        return
      }

      // Multi-word easter eggs (match full trimmed string)
      if (trimmed === 'sudo hire me') {
        newLines.push({ id: nextId(), type: 'output', content: <div className="cmd-output"><span className="accent">[sudo]</span> Permission granted. Sending offer letter... <span className="dim">📨</span></div> })
        newLines.push({ id: nextId(), type: 'system', content: '' })
        setLines((prev) => [...prev, ...newLines])
        setCmdHistory((prev) => [cmd.trim(), ...prev])
        setHistoryIdx(-1)
        setInput('')
        scrollToBottom()
        return
      }

      if (trimmed.startsWith('rm -rf') || trimmed.startsWith('rm -r')) {
        newLines.push({ id: nextId(), type: 'output', content: <div className="cmd-output">Nice try. System is read-only <span className="dim">😏</span></div> })
        newLines.push({ id: nextId(), type: 'system', content: '' })
        setLines((prev) => [...prev, ...newLines])
        setCmdHistory((prev) => [cmd.trim(), ...prev])
        setHistoryIdx(-1)
        setInput('')
        scrollToBottom()
        return
      }


      // Matrix rain easter egg
      if (name === 'hack') {
        newLines.push({ id: nextId(), type: 'output', content: <MatrixRain /> })
        newLines.push({ id: nextId(), type: 'system', content: '' })
        setLines((prev) => [...prev, ...newLines])
        setCmdHistory((prev) => [cmd.trim(), ...prev])
        setHistoryIdx(-1)
        setInput('')
        scrollToBottom()
        return
      }

      // cat command — cat skill.txt shows skill detail
      if (name === 'cat') {
        const fileName = args.join(' ')
        const match = fileName.replace(/\.txt$/i, '')
        // Find skill by case-insensitive match
        const skillKey = Object.keys(profile.skillDetails).find(
          (k) => k.toLowerCase() === match.toLowerCase()
        )
        if (skillKey && profile.skillDetails[skillKey]) {
          const d = profile.skillDetails[skillKey]
          newLines.push({
            id: nextId(),
            type: 'output',
            content: (
              <div className="cmd-output">
                <div><span className="amber">╔══════════════════════════════════════╗</span></div>
                <div><span className="amber">║</span> <span className="bright">{skillKey}</span><span className="amber">{' '.repeat(Math.max(1, 35 - skillKey.length))}║</span></div>
                <div><span className="amber">╚══════════════════════════════════════╝</span></div>
                <br />
                <div><span className="dim">  experience:</span> <span className="bright">{d.years}</span></div>
                <div><span className="dim">  proficiency:</span> <span className="accent">{d.level}</span></div>
                <div><span className="dim">  notes:</span> {d.note}</div>
                <br />
                <div><span className="dim">  used at:</span></div>
                {d.used.map((company, i) => (
                  <div key={i}><span className="dim">    ▸</span> <span className="cyan">{company}</span></div>
                ))}
              </div>
            ),
          })
        } else if (fileName === 'resume.pdf') {
          newLines.push({ id: nextId(), type: 'output', content: <div className="cmd-output"><span className="dim">{'>'}</span> Resume download coming soon. <span className="dim">For now:</span> <span className="cyan">[contact]</span> <span className="dim">me directly.</span></div> })
        } else {
          newLines.push({
            id: nextId(),
            type: 'output',
            content: <span className="error">cat: {fileName || '???'}: No such file. Try <span className="accent">cat python.txt</span></span>,
          })
        }
        newLines.push({ id: nextId(), type: 'system', content: '' })
        setLines((prev) => [...prev, ...newLines])
        setCmdHistory((prev) => [cmd.trim(), ...prev])
        setHistoryIdx(-1)
        setInput('')
        scrollToBottom()
        return
      }

      if (name === 'clear') {
        setLines([])
        setInput('')
        return
      }

      // Sound toggle
      if (name === 'sound') {
        const toggle = args[0]
        if (toggle === 'on') {
          setSoundEnabled(true)
          if (audioCtx?.state === 'suspended') audioCtx.resume()
          newLines.push({ id: nextId(), type: 'output', content: <span><span className="accent">[OK]</span> Sound enabled.</span> })
        } else if (toggle === 'off') {
          setSoundEnabled(false)
          newLines.push({ id: nextId(), type: 'output', content: <span><span className="accent">[OK]</span> Sound disabled.</span> })
        } else {
          newLines.push({ id: nextId(), type: 'output', content: <span><span className="dim">Usage:</span> sound <span className="accent">on</span>|<span className="accent">off</span></span> })
        }
        newLines.push({ id: nextId(), type: 'system', content: '' })
        setLines((prev) => [...prev, ...newLines])
        setCmdHistory((prev) => [cmd.trim(), ...prev])
        setHistoryIdx(-1)
        setInput('')
        scrollToBottom()
        return
      }

      // Theme switch
      if (name === 'theme') {
        const themeName = args[0]
        if (themeName && applyTheme(themeName)) {
          newLines.push({ id: nextId(), type: 'output', content: <span><span className="accent">[OK]</span> Theme set to <span className="bright">{themeName}</span>.</span> })
        } else {
          newLines.push({ id: nextId(), type: 'output', content: <span><span className="dim">Usage:</span> theme <span className="accent">green</span>|<span className="accent">amber</span>|<span className="accent">white</span></span> })
        }
        newLines.push({ id: nextId(), type: 'system', content: '' })
        setLines((prev) => [...prev, ...newLines])
        setCmdHistory((prev) => [cmd.trim(), ...prev])
        setHistoryIdx(-1)
        setInput('')
        scrollToBottom()
        return
      }

      const command = commandMap.get(name)

      if (!command) {
        const wittyResponses = [
          <>command not found. But I like your creativity. Try <span className="accent">help</span>?</>,
          <>I don't know that one yet. PR welcome at <span className="dim">github.com/...</span></>,
          <>*confused terminal noises* — try <span className="accent">help</span> for commands I know</>,
        ]
        const response = wittyResponses[Math.floor(Math.random() * wittyResponses.length)]
        newLines.push({
          id: nextId(),
          type: 'output',
          content: <span className="error">{response}</span>,
        })
      } else {
        const output = command.execute(args)
        if (output) {
          newLines.push({ id: nextId(), type: 'output', content: output })
        }
      }

      // Add empty line after output
      newLines.push({ id: nextId(), type: 'system', content: '' })

      setLines((prev) => [...prev, ...newLines])
      setCmdHistory((prev) => [cmd.trim(), ...prev])
      setHistoryIdx(-1)
      setInput('')
      scrollToBottom()
    },
    [scrollToBottom]
  )

  // Hint click handler
  const handleHintClick = useCallback(
    (cmd: string) => {
      executeCommand(cmd)
    },
    [executeCommand]
  )

  // Keyboard handling
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (soundEnabled) playClick()
    if (e.key === 'Enter') {
      executeCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length > 0) {
        const newIdx = Math.min(historyIdx + 1, cmdHistory.length - 1)
        setHistoryIdx(newIdx)
        setInput(cmdHistory[newIdx])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIdx > 0) {
        const newIdx = historyIdx - 1
        setHistoryIdx(newIdx)
        setInput(cmdHistory[newIdx])
      } else {
        setHistoryIdx(-1)
        setInput('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      // Simple tab completion
      const partial = input.trim().toLowerCase()
      if (partial) {
        const match = [...commandMap.keys()].find((k) => k.startsWith(partial))
        if (match) setInput(match)
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  // Click anywhere to focus input, and handle inline [command] clicks
  const handleBodyClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    // Handle skill tag clicks → run cat skill.txt
    if (target.classList.contains('skill-clickable')) {
      const skill = target.getAttribute('data-skill')
      if (skill) {
        e.stopPropagation()
        executeCommand(`cat ${skill}.txt`)
        return
      }
    }
    // Handle inline [command] tag clicks (cyan spans like [skills], [work], etc.)
    if (target.classList.contains('cyan') && target.closest('.cmd-output')) {
      const text = target.textContent?.replace(/[[\]]/g, '').trim()
      if (text && commandMap.has(text)) {
        e.stopPropagation()
        executeCommand(text)
        return
      }
    }
    inputRef.current?.focus()
  }

  return (
    <div className="crt-monitor">
      <div className="crt-bezel">
        <div className={`crt-screen ${showContent ? 'power-on' : ''}`}>
          <div
            className="terminal-body"
            ref={bodyRef}
            onClick={handleBodyClick}
          >
            {/* Output lines */}
            {lines.map((line) => (
              <div
                key={line.id}
                className={`terminal-line ${line.type} ${
                  line.type === 'boot' ? 'boot-line glow' : ''
                }`}
              >
                {line.type === 'input' ? (
                  <><span className="prompt-text">{PROMPT}</span><span className="input-echo">{line.content}</span></>
                ) : (
                  line.content
                )}
              </div>
            ))}

            {/* Input line */}
            {!isBooting && (
              <div className="input-row">
                <span className="prompt-text glow">{PROMPT}</span>
                <span className="input-sizer">{input}</span>
                <span className="cursor-block cursor-blink">█</span>
                <input
                  ref={inputRef}
                  type="text"
                  className="terminal-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                />
              </div>
            )}

            {/* Clickable command hints */}
            {!isBooting && (
              <div className="command-hints">
                {HINT_COMMANDS.map((cmd) => (
                  <button
                    key={cmd}
                    className="hint-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleHintClick(cmd)
                    }}
                  >
                    [{cmd}]
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <span className="crt-label">EvgenyOS v1.0</span>
      </div>
    </div>
  )
}
