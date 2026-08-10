import { useEffect, useRef, useState } from 'react'
import {
  Menu, X, ArrowUpRight, ArrowRight, Phone, Mail, MapPin, Clock,
  CheckCircle2, ChevronDown, Globe, MessageCircle, Star, Instagram,
  Microscope, Sparkles, Droplet, Leaf, SunMedium, Syringe, ShieldCheck,
  Gem, Award, HeartPulse, Users, Image as ImageIcon,
} from 'lucide-react'
import { content } from './i18n.js'
import { clinicInfo } from './clinicInfo.js'
import Chatbot from './components/Chatbot.jsx'

const ICONS = {
  Microscope, Sparkles, Droplet, Leaf, SunMedium, Syringe, ShieldCheck,
  Gem, Award, HeartPulse, Users,
}

/* ----------------------------------------------------------------
   Navbar
---------------------------------------------------------------- */
function Navbar({ t, lang, setLang }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const rtl = t.dir === 'rtl'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.about, href: '#why' },
    { label: t.nav.gallery, href: '#gallery' },
    { label: t.nav.faq, href: '#faq' },
    { label: t.nav.contact, href: '#contact' },
  ]

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg shadow-primary/10' : 'bg-transparent'
        } rounded-full px-4 sm:px-6 py-2.5 w-[calc(100%-2rem)] max-w-6xl`}
      >
        <div className="flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-2 group shrink-0">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary">
              <Sparkles className="h-4 w-4 text-deep" strokeWidth={2.3} />
              <span className="absolute inset-0 rounded-full ring-2 ring-primary/30 group-hover:ring-primary/50 transition" />
            </span>
            <span className={`font-display font-semibold tracking-tight text-base sm:text-lg leading-none ${scrolled ? 'text-ink' : 'text-ink'} transition-colors`}>
              Skin &amp; Beyond
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-tight lift-on-hover text-ink/70 hover:text-primary-dark transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-divider text-ink/70 hover:border-primary hover:text-primary-dark transition"
              aria-label="Toggle language"
            >
              <Globe className="h-3.5 w-3.5" />
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
            <a
              href="#contact"
              className="hidden lg:inline-flex magnetic-btn items-center gap-1.5 bg-primary text-deep px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-primary/30"
            >
              {t.nav.cta}
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" strokeWidth={2.5} />
            </a>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 rounded-full text-ink"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[60] transition-all duration-500 lg:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-deep/90 backdrop-blur-2xl" onClick={() => setOpen(false)} />
        <div className={`absolute top-0 ${rtl ? 'right-0' : 'left-0'} left-0 right-0 bg-background rounded-b-5xl px-6 pt-8 pb-12 transition-transform duration-500 ${open ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="flex items-center justify-between mb-10">
            <span className="font-display font-semibold text-xl text-ink">Skin &amp; Beyond</span>
            <button onClick={() => setOpen(false)} className="p-2 rounded-full bg-divider/40">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="font-display text-2xl font-medium text-ink py-3 border-b border-divider">
                {link.label}
              </a>
            ))}
          </div>
          <button
            onClick={() => { setLang(lang === 'en' ? 'ar' : 'en'); setOpen(false) }}
            className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary-dark"
          >
            <Globe className="h-4 w-4" /> {lang === 'en' ? 'عرض بالعربية' : 'View in English'}
          </button>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-8 magnetic-btn flex items-center justify-center gap-2 bg-primary text-deep px-6 py-4 rounded-full font-semibold w-full"
          >
            {t.nav.cta}
            <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
          </a>
        </div>
      </div>
    </>
  )
}

/* ----------------------------------------------------------------
   Hero
---------------------------------------------------------------- */
function Hero({ t }) {
  const ref = useRef(null)
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') || []
    els.forEach((el, i) => {
      setTimeout(() => el.classList.add('opacity-100', 'translate-y-0'), 150 + i * 130)
    })
  }, [])

  return (
    <section id="home" ref={ref} className="relative min-h-[100dvh] overflow-hidden pt-28">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute -top-24 rtl:-left-24 -right-24 ltr:-right-24 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute bottom-0 rtl:right-0 ltr:left-0 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

      {/* floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[18%] rtl:left-[12%] ltr:right-[14%] h-2.5 w-2.5 rounded-full bg-accent/60 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-[38%] rtl:left-[22%] ltr:right-[24%] h-1.5 w-1.5 rounded-full bg-primary-dark/50 animate-float" style={{ animationDelay: '1.6s' }} />
        <div className="absolute top-[60%] rtl:left-[8%] ltr:right-[9%] h-2 w-2 rounded-full bg-primary/70 animate-float" style={{ animationDelay: '3.1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-20 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <p className="reveal opacity-0 translate-y-6 transition-all duration-700 font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-primary-dark mb-6">
            {t.hero.eyebrow}
          </p>
          <h1 className="font-display font-medium text-ink leading-[1.02] tracking-tight">
            <span className="reveal opacity-0 translate-y-8 transition-all duration-700 block text-5xl sm:text-6xl lg:text-7xl">
              {t.hero.line1}
            </span>
            <span className="reveal opacity-0 translate-y-8 transition-all duration-700 block italic font-normal text-primary-dark text-5xl sm:text-6xl lg:text-7xl mt-1">
              {t.hero.line2}
            </span>
          </h1>
          <p className="reveal opacity-0 translate-y-6 transition-all duration-700 mt-8 max-w-xl text-muted text-base sm:text-lg leading-relaxed">
            {t.hero.subtext}
          </p>
          <div className="reveal opacity-0 translate-y-6 transition-all duration-700 mt-10 flex flex-wrap gap-3">
            <a href="#contact" className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep px-6 py-3.5 rounded-full font-semibold shadow-lg shadow-primary/30">
              {t.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
            </a>
            <a
              href={clinicInfo.social.instagram}
              target="_blank" rel="noreferrer"
              className="lift-on-hover inline-flex items-center gap-2 border border-divider text-ink px-6 py-3.5 rounded-full font-medium"
            >
              <Instagram className="h-4 w-4" />
              {t.hero.ctaSecondary}
            </a>
          </div>
          <div className="reveal opacity-0 translate-y-6 transition-all duration-700 mt-8 flex items-center gap-2 text-sm text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-accent-dark" />
            </span>
            {t.hero.trust}
          </div>
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
          <div className="reveal opacity-0 translate-y-8 transition-all duration-1000 relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-primary-light via-primary/20 to-accent/20 blur-2xl" />
            <div className="relative h-[340px] w-[280px] sm:h-[420px] sm:w-[340px] rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl shadow-primary/20">
              <img
                src={clinicInfo.images.headshot}
                alt={clinicInfo.doctorName}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 rtl:-right-5 ltr:-left-5 glass rounded-2xl px-5 py-3 shadow-xl">
              <p className="font-display font-semibold text-ink text-sm leading-none">{t.hero.name}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary-dark mt-1">
                {clinicInfo.credentials}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Skin-renewal signature animation (bloom particles)
---------------------------------------------------------------- */
function GlowBloom({ t }) {
  const [statusIdx, setStatusIdx] = useState(0)
  const statuses = t.dir === 'rtl'
    ? [
        { text: 'تجدد الخلايا · نشط', tone: 'primary' },
        { text: 'تحليل نوع البشرة', tone: 'accent' },
        { text: 'خطة العلاج جاهزة', tone: 'emerald' },
      ]
    : [
        { text: 'Renewal cycle · active', tone: 'primary' },
        { text: 'Analyzing skin profile', tone: 'accent' },
        { text: 'Treatment plan ready', tone: 'emerald' },
      ]

  useEffect(() => {
    const iv = setInterval(() => setStatusIdx((i) => (i + 1) % statuses.length), 2400)
    return () => clearInterval(iv)
  }, [])

  const particles = [
    { left: '14%', delay: '0.0s', dur: '3.2s', size: 10 },
    { left: '26%', delay: '1.1s', dur: '3.6s', size: 7 },
    { left: '40%', delay: '0.5s', dur: '3.0s', size: 12 },
    { left: '54%', delay: '1.8s', dur: '3.4s', size: 8 },
    { left: '68%', delay: '0.9s', dur: '3.1s', size: 11 },
    { left: '80%', delay: '2.1s', dur: '3.5s', size: 7 },
    { left: '92%', delay: '0.3s', dur: '2.9s', size: 9 },
  ]
  const status = statuses[statusIdx]
  const toneDot = status.tone === 'emerald' ? 'bg-emerald-500' : status.tone === 'accent' ? 'bg-accent' : 'bg-primary-dark'
  const toneText = status.tone === 'emerald' ? 'text-emerald-600' : status.tone === 'accent' ? 'text-accent-dark' : 'text-primary-dark'

  return (
    <div className="relative h-44 w-full rounded-3xl overflow-hidden border border-primary/15" style={{ background: 'linear-gradient(180deg, #FBF6EE 0%, #F2E7D4 60%, #EAD9BC 100%)' }}>
      <div className="absolute -top-8 -left-6 h-20 w-32 rounded-full bg-white/60 blur-2xl" />
      <div className="absolute top-2 right-10 h-14 w-24 rounded-full bg-white/50 blur-xl" />

      <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-accent-dark" strokeWidth={2.2} />
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-dark">Skin Cycle</span>
        </div>
      </div>

      <div className="absolute inset-x-0 top-12 bottom-11 overflow-hidden">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute bottom-0 rounded-full"
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: 'radial-gradient(circle, #F3E0B8 0%, #C9A66B 70%)',
              animation: `bloom-rise ${p.dur} ease-in-out ${p.delay} infinite`,
              filter: 'drop-shadow(0 1px 3px rgba(201,166,107,0.4))',
              transform: 'translateX(-50%)',
            }}
          />
        ))}
      </div>

      <svg className="absolute bottom-9 left-3 right-3 h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
        <path d="M 0,6 Q 12.5,2 25,6 T 50,6 T 75,6 T 100,6 T 125,6 T 150,6 T 175,6 T 200,6" fill="none" stroke="#A98449" strokeOpacity="0.4" strokeWidth="1.2" />
      </svg>

      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`relative h-2 w-2 rounded-full ${toneDot}`} />
          <span key={status.text} className={`font-mono text-[10px] truncate ${toneText}`} style={{ animation: 'bloom-fadein 0.35s ease-out' }}>
            {status.text}
          </span>
        </div>
      </div>
    </div>
  )
}

function CountUp({ end, suffix = '', duration = 1800 }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - p, 3)
          setValue(Math.round(end * eased))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end, duration])

  return <span ref={ref} className="tabular-nums">{value}{suffix}</span>
}

/* ----------------------------------------------------------------
   Features (3 principle cards)
---------------------------------------------------------------- */
function Features({ t }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary-dark">{t.features.eyebrow}</span>
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-ink mt-4 leading-[1.08] tracking-tight">
            {t.features.heading1}
            <span className="block italic font-normal text-primary-dark mt-1">{t.features.heading2}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {t.features.cards.map((card, idx) => (
            <article
              key={idx}
              style={{ transitionDelay: visible ? `${idx * 130}ms` : '0ms' }}
              className={`bg-surface border border-divider rounded-5xl p-7 shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{card.eyebrow}</span>
                <ArrowUpRight className="h-5 w-5 text-ink/25 rtl:-scale-x-100" strokeWidth={1.8} />
              </div>

              {idx === 1 ? <GlowBloom t={t} /> : (
                <div className="h-44 w-full rounded-3xl border border-divider bg-background flex items-center justify-center">
                  {idx === 0 ? <Microscope className="h-12 w-12 text-primary-dark/60" strokeWidth={1.4} /> : <HeartPulse className="h-12 w-12 text-primary-dark/60" strokeWidth={1.4} />}
                </div>
              )}

              <div className="mt-6">
                <h3 className="font-display font-semibold text-xl text-ink leading-tight">{card.title}</h3>
                <p className="font-normal italic text-primary-dark text-sm mt-1">{card.sub}</p>
                <p className="text-muted text-[15px] mt-4 leading-relaxed">{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Services grid
---------------------------------------------------------------- */
function Services({ t }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="services" ref={ref} className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-deep text-white overflow-hidden rounded-[3rem] mx-3 sm:mx-6">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute -top-20 rtl:-left-20 ltr:-right-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 rtl:right-0 ltr:-left-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{t.services.eyebrow}</span>
            <h2 className="font-display font-medium text-3xl sm:text-5xl mt-4 leading-[1.08] tracking-tight">
              {t.services.heading1}
              <span className="block italic font-normal text-primary mt-1">{t.services.heading2}</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-base leading-relaxed">{t.services.subtext}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-4xl overflow-hidden">
          {t.services.items.map((svc, i) => {
            const Icon = ICONS[svc.icon] || Sparkles
            return (
              <div
                key={i}
                style={{ transitionDelay: visible ? `${i * 60}ms` : '0ms' }}
                className={`group bg-deep p-6 sm:p-7 hover:bg-white/[0.03] transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              >
                <div className="h-11 w-11 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500 mb-5">
                  <Icon className="h-5 w-5 text-primary group-hover:text-deep" strokeWidth={2} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 leading-snug">{svc.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{svc.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Why Us (pillars)
---------------------------------------------------------------- */
function WhyUs({ t }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="why" ref={ref} className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary-dark">{t.why.eyebrow}</span>
            <h2 className="font-display font-medium text-3xl sm:text-5xl text-ink mt-4 leading-[1.08] tracking-tight">
              {t.why.heading1}
              <span className="block italic font-normal text-primary-dark">{t.why.heading2}</span>
            </h2>
          </div>
          <div className="flex gap-10">
            <div>
              <div className="font-display font-semibold text-4xl text-ink"><CountUp end={22} suffix="K+" /></div>
              <p className="text-muted text-xs mt-1 uppercase tracking-widest font-mono">Community</p>
            </div>
            <div>
              <div className="font-display font-semibold text-4xl text-ink"><CountUp end={100} suffix="%" /></div>
              <p className="text-muted text-xs mt-1 uppercase tracking-widest font-mono">Board-certified</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.why.pillars.map((p, i) => {
            const Icon = ICONS[p.icon] || Sparkles
            return (
              <div
                key={i}
                style={{ transitionDelay: visible ? `${i * 110}ms` : '0ms' }}
                className={`bg-surface border border-divider rounded-4xl p-6 hover:border-primary/40 transition-all duration-700 shadow-sm ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              >
                <Icon className="h-6 w-6 text-primary-dark mb-4" strokeWidth={1.8} />
                <h3 className="font-display font-semibold text-lg text-ink mb-2">{p.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{p.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Testimonials
---------------------------------------------------------------- */
function Testimonials({ t }) {
  return (
    <section className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-primary-light/25">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary-dark">{t.testimonials.eyebrow}</span>
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-ink mt-4 leading-[1.08] tracking-tight">
            {t.testimonials.heading1}
            <span className="block italic font-normal text-primary-dark">{t.testimonials.heading2}</span>
          </h2>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent-dark mb-12">{t.testimonials.note}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {t.testimonials.items.map((item, i) => (
            <div key={i} className="bg-surface rounded-4xl p-7 border border-divider shadow-sm">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-ink/70 text-sm leading-relaxed italic">"{item.text}"</p>
              <p className="mt-5 font-display font-semibold text-ink text-sm">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Insurance strip
---------------------------------------------------------------- */
function Insurance({ t }) {
  return (
    <section className="relative py-16 px-6 sm:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary-dark">{t.insurance.eyebrow}</span>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-ink mt-3">{t.insurance.heading}</h2>
        <p className="text-muted text-sm mt-3 max-w-xl mx-auto">{t.insurance.subtext}</p>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-16 rounded-2xl border border-dashed border-divider bg-surface flex items-center justify-center text-muted text-xs font-mono uppercase tracking-widest">
              Logo {n}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted/70 font-mono mt-4">{t.insurance.note}</p>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Gallery
---------------------------------------------------------------- */
function Gallery({ t }) {
  return (
    <section id="gallery" className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary-dark">{t.gallery.eyebrow}</span>
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-ink mt-4 leading-[1.08] tracking-tight">
            {t.gallery.heading1}
            <span className="block italic font-normal text-primary-dark">{t.gallery.heading2}</span>
          </h2>
          <p className="text-muted text-sm mt-4">{t.gallery.subtext}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
          <div className="col-span-2 row-span-2 rounded-4xl overflow-hidden border border-divider min-h-[280px]">
            <img src={clinicInfo.images.headshot} alt={clinicInfo.doctorName} className="h-full w-full object-cover" />
          </div>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="rounded-3xl border border-dashed border-divider bg-background flex flex-col items-center justify-center gap-2 min-h-[130px] text-muted">
              <ImageIcon className="h-6 w-6" strokeWidth={1.5} />
              <span className="text-[10px] font-mono uppercase tracking-widest">{t.gallery.addPhoto}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   FAQ
---------------------------------------------------------------- */
function FAQ({ t }) {
  const [openIdx, setOpenIdx] = useState(0)
  return (
    <section id="faq" className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-primary-light/20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary-dark">{t.faq.eyebrow}</span>
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-ink mt-4 leading-[1.08] tracking-tight">
            {t.faq.heading1}
            <span className="block italic font-normal text-primary-dark">{t.faq.heading2}</span>
          </h2>
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent-dark mt-4">{t.faq.note}</p>
        </div>

        <div className="mt-10 space-y-3">
          {t.faq.items.map((item, i) => (
            <div key={i} className="bg-surface border border-divider rounded-3xl overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start"
              >
                <span className="font-display font-medium text-ink text-base sm:text-lg">{item.q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-primary-dark transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`grid transition-all duration-300 ${openIdx === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-muted text-sm leading-relaxed">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Contact
---------------------------------------------------------------- */
function ContactForm({ t }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1200)
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary-dark">{t.contact.eyebrow}</span>
            <h2 className="font-display font-medium text-3xl sm:text-5xl text-ink mt-4 leading-[1.08] tracking-tight">
              {t.contact.heading1}
              <span className="block italic font-normal text-primary-dark">{t.contact.heading2}</span>
            </h2>
            <p className="text-muted text-base mt-6 leading-relaxed max-w-md">{t.contact.subtext}</p>

            <div className="mt-10 space-y-4">
              <a href={`tel:${clinicInfo.phoneTel}`} className="lift-on-hover flex items-center gap-4 group">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition shrink-0">
                  <Phone className="h-5 w-5 text-primary-dark group-hover:text-deep" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">{t.contact.phoneLabel}</span>
                  <span className="font-display font-medium text-ink text-base">{clinicInfo.phone}</span>
                </span>
              </a>
              <a href={`mailto:${clinicInfo.email}`} className="lift-on-hover flex items-center gap-4 group">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition shrink-0">
                  <Mail className="h-5 w-5 text-primary-dark group-hover:text-deep" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">{t.contact.emailLabel}</span>
                  <span className="font-display font-medium text-ink text-base">{clinicInfo.email}</span>
                </span>
              </a>
              <div className="flex items-center gap-4">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary-dark" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">{t.contact.addressLabel}</span>
                  <span className="font-display font-medium text-ink text-base">{clinicInfo.address[t.dir === 'rtl' ? 'ar' : 'en']}</span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-primary-dark" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">{t.contact.hoursLabel}</span>
                  <span className="font-display font-medium text-ink text-base">{clinicInfo.hours[t.dir === 'rtl' ? 'ar' : 'en']}</span>
                </span>
              </div>
            </div>

            <div className="mt-10 p-5 rounded-3xl bg-primary/5 border border-primary/15">
              <p className="text-sm text-muted leading-relaxed">{t.contact.security}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={onSubmit} className="bg-surface border border-divider rounded-5xl p-7 sm:p-10 shadow-xl shadow-primary/5">
              {status !== 'sent' ? (
                <>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label={t.contact.formName} required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                    <Field label={t.contact.formEmail} type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                  </div>
                  <div className="mt-5">
                    <Field label={t.contact.formPhone} type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                  </div>
                  <div className="mt-5">
                    <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2 block">{t.contact.formMessage}</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      placeholder={t.contact.formMessagePlaceholder}
                      className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition resize-none font-body"
                    />
                  </div>
                  <div className="mt-7 flex items-center justify-end">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-primary/30 disabled:opacity-50"
                    >
                      {status === 'sending' ? t.contact.sending : t.contact.submit}
                      <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="h-16 w-16 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-8 w-8 text-primary-dark" />
                  </div>
                  <h3 className="font-display font-semibold text-2xl text-ink mb-3">{t.contact.sentTitle}</h3>
                  <p className="text-muted max-w-md mx-auto">{t.contact.sentText}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, type = 'text', required, value, onChange }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2 block">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition font-body"
      />
    </div>
  )
}

/* ----------------------------------------------------------------
   Footer
---------------------------------------------------------------- */
function Footer({ t }) {
  return (
    <footer className="relative bg-deep text-white rounded-t-[3rem] mt-4 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[40rem] rounded-full bg-primary/15 blur-3xl" />

      <div className="relative px-6 sm:px-10 lg:px-16 pt-20 pb-10 max-w-7xl mx-auto">
        <div className="border-b border-white/10 pb-12 mb-12">
          <h2 className="font-display font-medium text-4xl sm:text-6xl leading-[1.02] tracking-tight">
            Skin &amp; Beyond
            <span className="italic font-normal text-primary block">by Dr. Nour</span>
          </h2>
          <p className="text-white/50 max-w-md mt-6">{t.footer.tagline}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-deep" strokeWidth={2.3} />
              </span>
              <span className="font-display font-semibold text-lg">Skin &amp; Beyond</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">{t.footer.disclaimer}</p>
            <a href={clinicInfo.social.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-5 text-primary text-sm font-medium">
              <Instagram className="h-4 w-4" /> {clinicInfo.social.instagramHandle}
            </a>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary mb-4">{t.footer.servicesTitle}</p>
            <ul className="space-y-2.5">
              {t.services.items.slice(0, 4).map((s, i) => (
                <li key={i}><a href="#services" className="text-white/65 hover:text-primary transition text-sm">{s.title}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary mb-4">{t.footer.clinicTitle}</p>
            <ul className="space-y-2.5">
              <li><a href="#why" className="text-white/65 hover:text-primary transition text-sm">{t.nav.about}</a></li>
              <li><a href="#gallery" className="text-white/65 hover:text-primary transition text-sm">{t.nav.gallery}</a></li>
              <li><a href="#faq" className="text-white/65 hover:text-primary transition text-sm">{t.nav.faq}</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary mb-4">{t.footer.contactTitle}</p>
            <ul className="space-y-2.5">
              <li><a href={`tel:${clinicInfo.phoneTel}`} className="text-white/65 hover:text-primary transition text-sm">{clinicInfo.phone}</a></li>
              <li><a href={`mailto:${clinicInfo.email}`} className="text-white/65 hover:text-primary transition text-sm">{clinicInfo.email}</a></li>
              <li className="text-white/65 text-sm">{clinicInfo.address[t.dir === 'rtl' ? 'ar' : 'en']}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">{t.footer.status}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/50 text-xs font-mono">
            <a href="#" className="hover:text-primary transition">{t.footer.privacy}</a>
            <a href="#" className="hover:text-primary transition">{t.footer.terms}</a>
            <span>&copy; 2026 Skin &amp; Beyond by Dr. Nour · {t.footer.rights}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ----------------------------------------------------------------
   Floating WhatsApp button
---------------------------------------------------------------- */
function WhatsAppButton({ t }) {
  const rtl = t.dir === 'rtl'
  return (
    <a
      href={clinicInfo.whatsappLink}
      target="_blank"
      rel="noreferrer"
      className={`fixed bottom-6 ${rtl ? 'left-6' : 'right-6'} z-40 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-4 shadow-xl shadow-emerald-500/30 magnetic-btn`}
      aria-label={t.whatsappBubble}
    >
      <MessageCircle className="h-6 w-6" fill="currentColor" strokeWidth={0} />
    </a>
  )
}

/* ----------------------------------------------------------------
   App
---------------------------------------------------------------- */
export default function App() {
  const [lang, setLang] = useState('en')
  const t = content[lang]

  useEffect(() => {
    document.documentElement.dir = t.dir
    document.documentElement.lang = lang
  }, [lang, t.dir])

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar t={t} lang={lang} setLang={setLang} />
      <main>
        <Hero t={t} />
        <Features t={t} />
        <Services t={t} />
        <WhyUs t={t} />
        <Testimonials t={t} />
        <Insurance t={t} />
        <Gallery t={t} />
        <FAQ t={t} />
        <ContactForm t={t} />
      </main>
      <Footer t={t} />
      <WhatsAppButton t={t} />
      <Chatbot t={t} lang={lang} />
    </div>
  )
}
