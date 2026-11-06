import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

type PrivacyPolicyProps = {
  open: boolean
  onClose: () => void
}

export function PrivacyPolicy({ open, onClose }: PrivacyPolicyProps) {
  const { t } = useTranslation()
  const policy = t('privacyPolicy', { returnObjects: true })
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) {
      if (!dialog.open) dialog.showModal()
      dialog.querySelector<HTMLButtonElement>('.policy-close')?.focus()
    } else if (dialog.open) {
      dialog.close()
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className="policy"
      aria-labelledby="privacy-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="policy-scroll">
        <button className="policy-close" type="button" onClick={onClose}>
          {policy.close}
        </button>
        <h2 id="privacy-title">{policy.title}</h2>
        <p className="policy-updated">{policy.updated}</p>
        <p>{policy.intro}</p>
        {policy.sections.map((section) => (
          <section key={section.id} aria-labelledby={`${section.id}-heading`}>
            <h3 id={`${section.id}-heading`}>{section.title}</h3>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.items.length > 0 && (
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {section.after.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.id === 'rights' && (
              <div className="policy-contact">
                <p>
                  <strong>{policy.contact.company}</strong>
                </p>
                <p>
                  <strong>{policy.contact.role}</strong> {policy.contact.name}
                </p>
                <p>
                  <strong>{policy.contact.emailLabel}</strong>{' '}
                  <a href={`mailto:${policy.contact.email}`}>{policy.contact.email}</a>
                </p>
                <p>
                  <strong>{policy.contact.phoneLabel}</strong>{' '}
                  <a href={`tel:${policy.contact.phone.replace(/[^\d+]/g, '')}`}>
                    {policy.contact.phone}
                  </a>
                </p>
              </div>
            )}
          </section>
        ))}
      </div>
    </dialog>
  )
}
