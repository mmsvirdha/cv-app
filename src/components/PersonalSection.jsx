import { useState } from 'react'
import '../styles/Section.css'

function PersonalSection({ personal, setPersonal }) {
  const [isEditing, setIsEditing] = useState(true)
  const [draft, setDraft] = useState({ ...personal })
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!draft.name.trim()) e.name = 'Name is required.'
    if (!draft.email.trim()) e.email = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(draft.email)) e.email = 'Enter a valid email.'
    return e
  }

  function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setPersonal({ ...draft })
    setErrors({})
    setIsEditing(false)
  }

  function handleEdit() {
    setDraft({ ...personal })
    setIsEditing(true)
  }

  function handleChange(field, value) {
    setDraft(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  if (!isEditing) {
    return (
      <div className="section-card">
        <h2 className="section-title">General Information</h2>
        <div className="info-display">
          <div className="info-name">{personal.name}</div>
          <div className="info-row">
            <span className="info-label">Email</span>
            <span className="info-value">{personal.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Phone</span>
            <span className="info-value">{personal.phone || '—'}</span>
          </div>
        </div>
        <div className="btn-row">
          <button className="btn btn-secondary" onClick={handleEdit}>Edit</button>
        </div>
      </div>
    )
  }

  return (
    <div className="section-card">
      <h2 className="section-title">General Information</h2>
      <p className="section-desc">This will appear at the top of your CV.</p>

      <div className="form-field">
        <label className="field-label" htmlFor="p-name">Full name *</label>
        <input
          id="p-name"
          type="text"
          value={draft.name}
          onChange={e => handleChange('name', e.target.value)}
          placeholder="Jane Smith"
        />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label className="field-label" htmlFor="p-email">Email address *</label>
          <input
            id="p-email"
            type="email"
            value={draft.email}
            onChange={e => handleChange('email', e.target.value)}
            placeholder="jane@email.com"
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
        <div className="form-field">
          <label className="field-label" htmlFor="p-phone">Phone number</label>
          <input
            id="p-phone"
            type="tel"
            value={draft.phone}
            onChange={e => handleChange('phone', e.target.value)}
            placeholder="+1 555 000 0000"
          />
        </div>
      </div>

      <div className="btn-row">
        <button className="btn btn-primary" onClick={handleSubmit}>Save information</button>
      </div>
    </div>
  )
}

export default PersonalSection
