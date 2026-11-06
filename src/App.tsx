import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import handshake from './assets/dlr-handshake.png'
import logo from './assets/dlr-logo-bronze.png'
import { Icon } from './icons'
import { PrivacyPolicy } from './PrivacyPolicy'
import './App.css'

const navItems = [
  { href: '#home', label: 'home' },
  { href: '#services', label: 'services' },
  { href: '#who-we-work-with', label: 'whoWeWorkWith' },
  { href: '#payment-terms', label: 'paymentTerms' },
  { href: '#contact', label: 'contact' },
] as const

const serviceIds = [
  'professionalRepresentation',
  'negotiations',
  'conflictResolution',
] as const

const serviceIcons = {
  professionalRepresentation: 'users',
  negotiations: 'handshake',
  conflictResolution: 'scale',
} as const

const coverageItems = [
  { id: 'wcb', icon: 'shield-check' },
  { id: 'cyber', icon: 'lock-keyhole' },
  { id: 'liability', icon: 'building-2' },
  { id: 'vehicle', icon: 'truck' },
] as const

const termIcons = {
  'no-credit-offered': 'card',
  'new-clients': 'document',
  'existing-clients': 'calendar',
  'grace-period': 'clock',
} as const

function App() {
  const { t } = useTranslation()
  const sections = t('sections', { returnObjects: true })
  const paymentTerms = sections.paymentTerms
  const [menuOpen, setMenuOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('#home')
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const privacyButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.title = t('meta.title')
  }, [t])

  useEffect(() => {
    const sectionIds = navItems
      .filter((item) => item.label !== 'contact')
      .map((item) => item.href.slice(1))

    function updateActiveSection() {
      const rootFont = parseFloat(getComputedStyle(document.documentElement).fontSize) || 17
      const marker = 5.1 * rootFont + 4
      let current = sectionIds[0]
      for (const id of sectionIds) {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= marker) {
          current = id
        }
      }
      setActiveHref(`#${current}`)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  function goToSection(event: MouseEvent<HTMLAnchorElement>) {
    setMenuOpen(false)
    const id = event.currentTarget.hash.slice(1)
    const target = document.getElementById(id)
    const heading = target?.matches('h1, h2')
      ? target
      : target?.querySelector('h1, h2')
    if (!(heading instanceof HTMLElement)) return
    heading.tabIndex = -1
    const fromKeyboard = event.detail === 0
    window.requestAnimationFrame(() => {
      heading.focus({ preventScroll: true, focusVisible: fromKeyboard })
    })
  }

  useEffect(() => {
    if (!menuOpen) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      menuButtonRef.current?.focus()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  function closePrivacy() {
    setPrivacyOpen(false)
    window.requestAnimationFrame(() => {
      privacyButtonRef.current?.focus()
    })
  }

  return (
    <>
      <a className="skip-link" href="#home" onClick={goToSection}>
        {t('nav.skip')}
      </a>
      <header className="site-header">
        <div className="wrap header-bar">
          <a
            className="brand"
            href="#home"
            aria-label={`${t('meta.title')}, ${t('nav.home')}`}
            onClick={goToSection}
          >
            <img src={logo} alt="" />
          </a>
          <button
            ref={menuButtonRef}
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-icon" />
          </button>
          <nav id="site-nav" aria-label={t('nav.primary')} className={menuOpen ? 'is-open' : undefined}>
            {navItems
              .filter((item) => item.label !== 'contact')
              .map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={item.href === activeHref ? 'location' : undefined}
                  onClick={goToSection}
                >
                  {t(`nav.${item.label}`)}
                </a>
              ))}
          </nav>
          <a className="button" href="#contact" onClick={goToSection}>
            {t('nav.getInTouch')}
          </a>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">{t('hero.eyebrow')}</p>
            <h1 id="hero-title">
              <span>{t('hero.titleLead')}</span>
              <span className="accent">{t('hero.titleAccent')}</span>
              <span>{t('hero.titleEnd')}</span>
            </h1>
            <p>{t('hero.body')}</p>
          </div>
          <div className="hero-media">
            <img className="hero-photo" src={handshake} alt="" />
          </div>
        </section>

        <section className="services" id="services" aria-labelledby="services-title">
          <div className="wrap">
            <header className="section-intro">
              <p className="eyebrow">{t('servicesIntro.eyebrow')}</p>
              <h2 id="services-title">{t('servicesIntro.title')}</h2>
              <p>{t('servicesIntro.intro')}</p>
            </header>
            <div className="service-grid">
              {serviceIds.map((id) => {
                const service = sections[id]
                return (
                  <article key={id} aria-labelledby={`${id}-title`}>
                    <Icon name={serviceIcons[id]} />
                    <h3 id={`${id}-title`}>{service.title}</h3>
                    {service.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section
          className="audience"
          id="who-we-work-with"
          aria-labelledby="audience-title"
        >
          <div className="audience-copy">
            <p className="eyebrow">{sections.whoWeWorkWith.title}</p>
            <h2 id="audience-title">{t('audience.headline')}</h2>
            {sections.whoWeWorkWith.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="coverage" id="coverage" aria-labelledby="coverage-title">
          <div className="wrap">
            <h2 id="coverage-title">{t('coverage.title')}</h2>
            <p>{t('coverage.body')}</p>
            <div className="coverage-grid">
              {coverageItems.map((item) => (
                <article key={item.id} aria-labelledby={`${item.id}-title`}>
                  <Icon name={item.icon} />
                  <h3 id={`${item.id}-title`}>{t(`coverage.items.${item.id}`)}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="terms"
          id="payment-terms"
          aria-labelledby="payment-title"
        >
          <div className="wrap">
            <header className="section-intro">
              <p className="eyebrow">{paymentTerms.title}</p>
              <h2 id="payment-title">{paymentTerms.lead}</h2>
            </header>
            <div className="terms-grid">
              {paymentTerms.subsections.map((subsection) => (
                <article
                  key={subsection.id}
                  id={subsection.id}
                  aria-labelledby={`${subsection.id}-title`}
                >
                  <Icon name={termIcons[subsection.id as keyof typeof termIcons]} />
                  <h3 id={`${subsection.id}-title`}>{subsection.title}</h3>
                  {subsection.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </article>
              ))}
              <p className="terms-close">
                <Icon name="coins" />
                <span>{paymentTerms.closing}</span>
              </p>
            </div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="wrap contact-grid">
            <div>
              <p className="eyebrow">{t('contact.eyebrow')}</p>
              <h2 id="contact-title">{t('contact.title')}</h2>
              <p>{t('contact.body')}</p>
            </div>
            <ul className="contact-list">
              <li>
                <a href={`tel:${t('contact.phone').replace(/[^\d+]/g, '')}`}>
                  <Icon name="phone" />
                  <span>
                    <strong>{t('contact.callLabel')}</strong>
                    <span className="contact-value">{t('contact.phone')}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${t('contact.email')}`}>
                  <Icon name="mail" />
                  <span>
                    <strong>{t('contact.emailLabel')}</strong>
                    <span className="contact-value">{t('contact.email')}</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <footer className="site-footer">
            <div className="wrap footer-legal">
              <p>{t('footer.rights')}</p>
              <p>
                <button
                  ref={privacyButtonRef}
                  type="button"
                  onClick={() => setPrivacyOpen(true)}
                >
                  {t('footer.privacy')}
                </button>
              </p>
            </div>
          </footer>
        </section>
      </main>
      <PrivacyPolicy open={privacyOpen} onClose={closePrivacy} />
    </>
  )
}

export default App
