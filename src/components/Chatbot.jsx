import { useEffect, useRef, useState } from 'react'
import { MessageCircle, X, Send, Sparkles, ArrowLeft } from 'lucide-react'
import { clinicInfo } from '../clinicInfo.js'

function uid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return 'sess-' + Math.random().toString(36).slice(2) + Date.now()
}

export default function Chatbot({ t, lang }) {
  const rtl = t.dir === 'rtl'
  const c = t.chatbot

  const [open, setOpen] = useState(false)
  const [dismissedIntro, setDismissedIntro] = useState(false)
  const [stage, setStage] = useState('form') // 'form' | 'chat'
  const [lead, setLead] = useState({ name: '', phone: '', email: '', question: '', consent: false })
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const sessionId = useRef(uid())
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, sending])

  const sendToWebhook = async (text) => {
    setSending(true)
    try {
      const res = await fetch(clinicInfo.chatWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sendMessage',
          sessionId: sessionId.current,
          chatInput: text,
          lead: {
            name: lead.name,
            phone: lead.phone,
            email: lead.email,
            initialQuestion: lead.question,
          },
          language: lang,
        }),
      })
      let botText = ''
      try {
        const data = await res.json()
        botText = data.output || data.text || data.message || data.reply || JSON.stringify(data)
      } catch {
        botText = await res.text()
      }
      setMessages((m) => [...m, { role: 'bot', text: botText || '...' }])
    } catch (err) {
      setMessages((m) => [...m, { role: 'bot', text: lang === 'ar'
        ? 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة لاحقاً أو التواصل عبر واتساب.'
        : 'Sorry, something went wrong connecting. Please try again shortly, or reach us on WhatsApp.' }])
    } finally {
      setSending(false)
    }
  }

  const handleStartChat = async (e) => {
    e.preventDefault()
    if (!lead.name || !lead.phone || !lead.email || !lead.consent) return
    setStage('chat')
    const greeting = c.welcomeBack.replace('{name}', lead.name.split(' ')[0])
    setMessages([{ role: 'bot', text: greeting }])
    const firstMessage = lead.question?.trim()
      ? lead.question
      : (lang === 'ar' ? 'مرحباً، أرغب بمعرفة المزيد.' : 'Hi, I would like to know more.')
    await sendToWebhook(firstMessage)
  }

  const handleSend = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || sending) return
    setMessages((m) => [...m, { role: 'user', text }])
    setInput('')
    await sendToWebhook(text)
  }

  const Avatar = () => (
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary shrink-0">
      <Sparkles className="h-4 w-4 text-deep" strokeWidth={2.3} />
    </span>
  )

  return (
    <div className={`fixed bottom-6 z-50 ${rtl ? 'left-24 sm:left-6' : 'right-24 sm:right-6'}`}>
      {/* Closed intro bubble */}
      {!open && !dismissedIntro && (
        <div className={`absolute bottom-16 ${rtl ? 'left-0' : 'right-0'} w-64 glass rounded-3xl p-4 shadow-xl mb-2 animate-float`} style={{ animationDuration: '5s' }}>
          <button
            onClick={() => setDismissedIntro(true)}
            className={`absolute -top-2 ${rtl ? '-left-2' : '-right-2'} h-6 w-6 rounded-full bg-surface border border-divider flex items-center justify-center text-muted`}
            aria-label="Dismiss"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <p className="text-sm text-ink leading-snug">{c.launcherIntro}</p>
        </div>
      )}

      {/* Launcher button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="magnetic-btn h-14 w-14 rounded-full bg-deep text-white flex items-center justify-center shadow-xl shadow-deep/30"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6 text-primary" />
        </button>
      )}

      {/* Widget panel */}
      {open && (
        <div className={`absolute bottom-0 ${rtl ? 'left-0' : 'right-0'} w-[92vw] max-w-sm h-[560px] max-h-[80vh] bg-surface rounded-4xl shadow-2xl border border-divider flex flex-col overflow-hidden`}>
          {/* Header */}
          <div className="bg-deep text-white px-5 py-4 flex items-center gap-3 shrink-0">
            {stage === 'chat' && (
              <button onClick={() => setStage('form')} className="p-1 -m-1 text-white/70 hover:text-white" aria-label="Back">
                <ArrowLeft className={`h-4 w-4 ${rtl ? 'rotate-180' : ''}`} />
              </button>
            )}
            <Avatar />
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-sm leading-none">{c.name}</p>
              <p className="text-[11px] text-white/60 mt-1">{c.role}</p>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] text-emerald-300 font-mono uppercase tracking-wide">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {c.online}
            </span>
            <button onClick={() => setOpen(false)} className="p-1 -m-1 text-white/70 hover:text-white" aria-label="Close chat">
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {stage === 'form' ? (
            <form onSubmit={handleStartChat} className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              <div>
                <p className="font-display font-semibold text-ink text-base">{c.formTitle}</p>
                <p className="text-muted text-xs mt-1">{c.formSubtext}</p>
              </div>
              <input
                required
                placeholder={c.name_}
                value={lead.name}
                onChange={(e) => setLead({ ...lead, name: e.target.value })}
                className="w-full bg-background border border-divider rounded-2xl px-4 py-3 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
              <input
                required
                type="tel"
                placeholder={c.phone}
                value={lead.phone}
                onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                className="w-full bg-background border border-divider rounded-2xl px-4 py-3 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
              <input
                required
                type="email"
                placeholder={c.email}
                value={lead.email}
                onChange={(e) => setLead({ ...lead, email: e.target.value })}
                className="w-full bg-background border border-divider rounded-2xl px-4 py-3 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
              <textarea
                placeholder={c.question}
                rows={2}
                value={lead.question}
                onChange={(e) => setLead({ ...lead, question: e.target.value })}
                className="w-full bg-background border border-divider rounded-2xl px-4 py-3 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 resize-none"
              />
              <label className="flex items-start gap-2 text-xs text-muted">
                <input
                  required
                  type="checkbox"
                  checked={lead.consent}
                  onChange={(e) => setLead({ ...lead, consent: e.target.checked })}
                  className="mt-0.5 accent-primary-dark"
                />
                {c.consent}
              </label>
              <button
                type="submit"
                className="magnetic-btn mt-1 w-full bg-primary text-deep font-semibold rounded-full py-3 text-sm shadow-lg shadow-primary/30"
              >
                {c.start}
              </button>
            </form>
          ) : (
            <>
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={`flex items-end gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    {m.role === 'bot' && <Avatar />}
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user' ? 'bg-primary text-deep rounded-br-sm' : 'bg-background text-ink rounded-bl-sm border border-divider'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {sending && (
                  <div className="flex items-end gap-2">
                    <Avatar />
                    <div className="bg-background border border-divider rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-dark/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-dark/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-dark/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={handleSend} className="p-3 border-t border-divider flex items-center gap-2 shrink-0">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={c.inputPlaceholder}
                  className="flex-1 bg-background border border-divider rounded-full px-4 py-2.5 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
                <button
                  type="submit"
                  disabled={sending || !input.trim()}
                  className="h-10 w-10 rounded-full bg-primary text-deep flex items-center justify-center shrink-0 disabled:opacity-40"
                  aria-label={c.send}
                >
                  <Send className={`h-4 w-4 ${rtl ? '-scale-x-100' : ''}`} />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  )
}
