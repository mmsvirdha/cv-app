import { useState } from 'react'
import '../styles/Section.css'

const EMPTY_ENTRY = { company: '', title: '', from: '', to: '', responsibilities: '' }

function ExperienceForm({ initial, onSave, onCancel, title }) {
  const [draft, setDraft] = useState({ ...initial })
  const [errors, setErrors] = useState({})

  function handleChange(field, value) {
    setDraft(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  function handleSave() {
    const e = {}
    if (!draft.company.trim()) e.company = 'Company name is required.'
    if (!draft.title.trim()) e.title = 'Position title is required.'
    if (Object.keys(e).length > 0) { setErrors(e); return }
    onSave(draft)
  }

  return (
    <div className="inline-form">
      <h3 className="inline-form-title">{title}</h3>

      <div className="form-row">
        <div className="form-field">
          <label className="field-label" htmlFor="x-company">Company *</label>
          <input
            id="x-company"
            type="text"
            value={draft.company}
            onChange={e => handleChange('company', e.target.value)}
            placeholder="Acme Corp"
          />
          {errors.company && <span className="field-error">{errors.company}</span>}
        </div>
        <div className="form-field">
          <label className="field-label" htmlFor="x-title">Position title *</label>
          <input
            id="x-title"
            type="text"
            value={draft.title}
            onChange={e => handleChange('title', e.target.value)}
            placeholder="Software Engineer"
          />
          {errors.title && <span className="field-error">{errors.title}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label className="field-label" htmlFor="x-from">Start date</label>
          <input
            id="x-from"
            type="text"
            value={draft.from}
            onChange={e => handleChange('from', e.target.value)}
            placeholder="Jan 2022"
          />
        </div>
        <div className="form-field">
          <label className="field-label" htmlFor="x-to">End date</label>
          <input
            id="x-to"
            type="text"
            value={draft.to}
            onChange={e => handleChange('to', e.target.value)}
            placeholder="Present"
          />
        </div>
      </div>

      <div className="form-field">
        <label className="field-label" htmlFor="x-resp">Main responsibilities</label>
        <textarea
          id="x-resp"
          value={draft.responsibilities}
          onChange={e => handleChange('responsibilities', e.target.value)}
          placeholder="Describe your key responsibilities and achievements..."
        />
      </div>

      <div className="btn-row">
        <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave}>Save entry</button>
      </div>
    </div>
  )
}

function ExperienceSection({ experience, setExperience }) {
  const [showForm, setShowForm] = useState(false)
  const [editIndex, setEditIndex] = useState(null)

  function handleAdd(entry) {
    setExperience(prev => [...prev, entry])
    setShowForm(false)
  }

  function handleEdit(entry) {
    setExperience(prev => prev.map((e, i) => i === editIndex ? entry : e))
    setEditIndex(null)
  }

  function handleDelete(index) {
    setExperience(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="section-card">
      <h2 className="section-title">Work Experience</h2>
      <p className="section-desc">Add your work history, most recent first.</p>

      {experience.length === 0 && !showForm && editIndex === null && (
        <div className="empty-list">No experience entries yet. Add one below.</div>
      )}

      <div className="entry-list">
        {experience.map((entry, i) => (
          editIndex === i ? (
            <ExperienceForm
              key={i}
              title="Edit experience"
              initial={entry}
              onSave={handleEdit}
              onCancel={() => setEditIndex(null)}
            />
          ) : (
            <div key={i} className="entry-item">
              <div className="entry-main">
                <div className="entry-title">{entry.title}</div>
                <div className="entry-sub">{entry.company}</div>
                {(entry.from || entry.to) && (
                  <div className="entry-date">
                    {entry.from}{entry.from && entry.to ? ' – ' : ''}{entry.to}
                  </div>
                )}
                {entry.responsibilities && (
                  <div className="entry-responsibilities">{entry.responsibilities}</div>
                )}
              </div>
              <div className="entry-actions">
                <button
                  className="btn btn-sm"
                  onClick={() => { setEditIndex(i); setShowForm(false) }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(i)}
                >
                  Remove
                </button>
              </div>
            </div>
          )
        ))}
      </div>

      {showForm && (
        <ExperienceForm
          title="Add experience"
          initial={EMPTY_ENTRY}
          onSave={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}

      {!showForm && editIndex === null && (
        <button
          className="btn-add-entry"
          onClick={() => setShowForm(true)}
        >
          + Add experience
        </button>
      )}
    </div>
  )
}

export default ExperienceSection
