import { useEffect, useMemo, useRef, useState } from 'react'

function WorkOrderForm() {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    zip: '',
    description: '',
  })

  const [images, setImages] = useState([]) // { file, url }
  const inputFileRef = useRef(null)
  const recaptchaRef = useRef(null)
  const [recaptchaId, setRecaptchaId] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    company: false,
    email: false,
    phone: false,
    address: false,
    zip: false,
    description: false,
  })

  const onChange = (e) => {
    const { name, value } = e.target
    setValues(v => ({ ...v, [name]: value }))
  }

  const isImageFile = (file) => file && file.type && file.type.startsWith('image/')

  const addFiles = (fileList) => {
    const files = Array.from(fileList || [])
      .filter(isImageFile)
      .slice(0, 25) // safety cap

    if (files.length === 0) return

    const next = files.map(file => ({ file, url: URL.createObjectURL(file) }))
    setImages(prev => [...prev, ...next])
  }

  const onPickFiles = (e) => {
    addFiles(e.target.files)
    // reset input so selecting the same file again still triggers change
    e.target.value = ''
  }

  const onDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
    addFiles(e.dataTransfer.files)
  }

  const onDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const onDragLeave = () => setDragOver(false)

  useEffect(() => {
    // cleanup object URLs on unmount
    return () => {
      images.forEach(img => URL.revokeObjectURL(img.url))
    }
  }, [images])

  const removeImageAt = (idx) => {
    setImages(prev => {
      const copy = [...prev]
      const [removed] = copy.splice(idx, 1)
      if (removed) URL.revokeObjectURL(removed.url)
      return copy
    })
  }

  const validEmail = useMemo(() => /.+@.+\..+/.test(values.email), [values.email])
  const validPhone = useMemo(() => /[0-9()\-+\.\s]{7,}/.test(values.phone), [values.phone])

  // Field-level invalid flags (only after touch)
  const firstNameInvalid = touched.firstName && values.firstName.trim() === ''
  const lastNameInvalid = touched.lastName && values.lastName.trim() === ''
  const emailInvalid = touched.email && (values.email.trim() === '' || !validEmail)
  const phoneInvalid = touched.phone && values.phone.trim().length > 0 && !validPhone
  const addressInvalid = touched.address && values.address.trim() === ''
  const descriptionInvalid = touched.description && values.description.trim() === ''

  // Render the invisible reCAPTCHA widget once the script is available
  useEffect(() => {
    if (!siteKey) return
    let cancelled = false
    const attemptRender = () => {
      if (cancelled) return
      const grecaptcha = window.grecaptcha
      if (grecaptcha && recaptchaRef.current && recaptchaId == null) {
        try {
          const id = grecaptcha.render(recaptchaRef.current, {
            sitekey: siteKey,
            size: 'invisible',
            callback: (token) => doSubmitWithToken(token),
            'error-callback': () => {
              setSubmitting(false)
              alert('reCAPTCHA failed. Please try again.')
            },
            'expired-callback': () => {
              // optional: prompt a retry if needed
            }
          })
          setRecaptchaId(id)
        } catch {}
      } else {
        setTimeout(attemptRender, 300)
      }
    }
    attemptRender()
    return () => { cancelled = true }
  }, [siteKey, recaptchaId])

  const finishSubmit = (extra = {}) => {
    // Simulate submission; in a real app, POST to an API or Firebase Storage/Firestore
    const payload = {
      ...values,
      ...extra,
      images: images.map(({ file }) => ({ name: file.name, size: file.size, type: file.type })),
      submittedAt: new Date().toISOString(),
    }
    console.log('Work order submitted:', payload)

    setSubmitted(true)
    // optional: reset form after brief success
    setTimeout(() => {
      setValues({ firstName: '', lastName: '', company: '', email: '', phone: '', address: '', zip: '', description: '' })
      setImages(prev => {
        prev.forEach(img => URL.revokeObjectURL(img.url))
        return []
      })
    }, 1200)
  }

  const doSubmitWithToken = (token) => {
    setSubmitting(false)
    finishSubmit({ recaptchaToken: token })
    try {
      if (window.grecaptcha && recaptchaId != null) {
        window.grecaptcha.reset(recaptchaId)
      }
    } catch {}
  }

  const onSubmit = (e) => {
    e.preventDefault()

    // rudimentary validation
    if (!values.firstName || !values.lastName || !validEmail) {
      setTouched(t => ({ ...t, firstName: true, lastName: true, email: true }))
      alert('Please fill in First Name, Last Name, and a valid Email.')
      return
    }

    // If reCAPTCHA is configured and rendered, execute it; otherwise fallback to direct submit
    if (siteKey && recaptchaId != null && window.grecaptcha) {
      setSubmitting(true)
      try {
        window.grecaptcha.execute(recaptchaId)
      } catch {
        setSubmitting(false)
        finishSubmit()
      }
    } else {
      finishSubmit()
    }
  }

  return (
    <section className="workorder">
      <div className="form-card">
        <h2 className="form-title">Initiate a Work Order</h2>
        <p className="form-subtitle">Provide your contact details and attach any relevant photos. We'll follow up promptly.</p>
        <form className="form" onSubmit={onSubmit} noValidate>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" name="firstName" type="text" value={values.firstName} onChange={onChange} onBlur={() => setTouched(t => ({ ...t, firstName: true }))} autoComplete="given-name" required aria-invalid={firstNameInvalid} />
            </div>

            <div className="form-field">
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" name="lastName" type="text" value={values.lastName} onChange={onChange} onBlur={() => setTouched(t => ({ ...t, lastName: true }))} autoComplete="family-name" required aria-invalid={lastNameInvalid} />
            </div>

            <div className="form-field">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" value={values.company} onChange={onChange} onBlur={() => setTouched(t => ({ ...t, company: true }))} autoComplete="organization" />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={values.email} onChange={onChange} onBlur={() => setTouched(t => ({ ...t, email: true }))} autoComplete="email" required aria-invalid={emailInvalid} />
            </div>

            <div className="form-field">
              <label htmlFor="phone">Phone Number</label>
              <input id="phone" name="phone" type="tel" value={values.phone} onChange={onChange} onBlur={() => setTouched(t => ({ ...t, phone: true }))} autoComplete="tel" placeholder="(555) 555-5555" aria-invalid={phoneInvalid} />
            </div>

            <div className="form-field">
              <label htmlFor="zip">Zip</label>
              <input id="zip" name="zip" type="text" value={values.zip} onChange={onChange} onBlur={() => setTouched(t => ({ ...t, zip: true }))} inputMode="numeric" autoComplete="postal-code" />
            </div>

            <div className="form-field form-field--full">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" value={values.address} onChange={onChange} onBlur={() => setTouched(t => ({ ...t, address: true }))} autoComplete="street-address" required aria-invalid={addressInvalid} />
            </div>

            <div className="form-field form-field--full">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={values.description}
                onChange={onChange}
                placeholder="Describe the issue or request"
                rows={4}
                required
                aria-invalid={descriptionInvalid}
                onBlur={() => setTouched(t => ({ ...t, description: true }))}
              />
            </div>
          </div>

          <div className={`upload ${dragOver ? 'is-dragover' : ''}`} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
            <input
              ref={inputFileRef}
              id="images"
              name="images"
              type="file"
              accept="image/*"
              multiple
              onChange={onPickFiles}
              className="upload-input"
              aria-label="Add photos"
            />
            <div className="upload-cta" onClick={() => inputFileRef.current?.click()} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputFileRef.current?.click()}>
              <div className="upload-icon" aria-hidden>📷</div>
              <div className="upload-text">
                <strong>Drag & drop</strong> photos here, or <span className="upload-link">browse</span>
                <div className="upload-hint">JPEG, PNG, GIF up to ~10MB each</div>
              </div>
            </div>

            {images.length > 0 && (
              <div className="thumbs">
                {images.map((img, i) => (
                  <div key={img.url} className="thumb">
                    <img src={img.url} alt={`Upload ${i+1}`} />
                    <button type="button" className="thumb-remove" aria-label="Remove image" onClick={() => removeImageAt(i)}>
                      <svg className="thumb-remove__svg" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6 6l12 12M18 6l-12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="sub-nav-cta" disabled={submitting}>
              {submitting ? 'Verifying…' : 'Submit Work Order'}
            </button>
            {submitted && <span className="form-success" role="status">Submitted! We’ll be in touch.</span>}
          </div>

          {/* Invisible reCAPTCHA container (hidden) */}
          {siteKey && (
            <div ref={recaptchaRef} style={{ display: 'none' }} />
          )}
        </form>
      </div>
    </section>
  )
}

export default WorkOrderForm
