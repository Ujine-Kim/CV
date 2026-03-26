import { useState, useRef, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { profile } from '../data/profile'

const { serviceId: EMAILJS_SERVICE_ID, templateId: EMAILJS_TEMPLATE_ID, publicKey: EMAILJS_PUBLIC_KEY } = profile.emailjs

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return

    setStatus('sending')

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="contact-form-wrap">
        <div className="form-success">
          <span className="accent">[OK]</span> Message sent successfully.
        </div>
        <div className="dim">I'll get back to you soon.</div>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      className="contact-form-wrap"
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="form-field">
        <label className="form-label" htmlFor="cf-name">
          name<span className="dim">:</span>
        </label>
        <input
          id="cf-name"
          name="from_name"
          type="text"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="your name"
          autoComplete="off"
          spellCheck={false}
          required
        />
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="cf-email">
          email<span className="dim">:</span>
        </label>
        <input
          id="cf-email"
          name="reply_to"
          type="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="off"
          spellCheck={false}
          required
        />
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="cf-msg">
          message<span className="dim">:</span>
        </label>
        <textarea
          id="cf-msg"
          name="message"
          className="form-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="type your message..."
          rows={4}
          spellCheck={false}
          required
        />
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="form-submit"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? '[ sending... ]' : '[ send message ]'}
        </button>
        {status === 'error' && (
          <span className="error">Failed to send. Try again.</span>
        )}
      </div>
    </form>
  )
}
